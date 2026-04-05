from fastapi import FastAPI, APIRouter, UploadFile, File, HTTPException, Response
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import requests
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Object Storage Configuration
STORAGE_URL = "https://integrations.emergentagent.com/objstore/api/v1/storage"
EMERGENT_KEY = os.environ.get("EMERGENT_LLM_KEY")
APP_NAME = "secure-access-uk"
storage_key = None

# Create the main app
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ============ Object Storage Functions ============
def init_storage():
    """Initialize storage - call once at startup"""
    global storage_key
    if storage_key:
        return storage_key
    if not EMERGENT_KEY:
        logger.warning("EMERGENT_LLM_KEY not set - file uploads disabled")
        return None
    try:
        resp = requests.post(f"{STORAGE_URL}/init", json={"emergent_key": EMERGENT_KEY}, timeout=30)
        resp.raise_for_status()
        storage_key = resp.json()["storage_key"]
        logger.info("Storage initialized successfully")
        return storage_key
    except Exception as e:
        logger.error(f"Storage init failed: {e}")
        return None

def put_object(path: str, data: bytes, content_type: str) -> dict:
    """Upload file to object storage"""
    key = init_storage()
    if not key:
        raise HTTPException(status_code=503, detail="Storage not available")
    resp = requests.put(
        f"{STORAGE_URL}/objects/{path}",
        headers={"X-Storage-Key": key, "Content-Type": content_type},
        data=data, timeout=120
    )
    resp.raise_for_status()
    return resp.json()

def get_object(path: str) -> tuple:
    """Download file from object storage"""
    key = init_storage()
    if not key:
        raise HTTPException(status_code=503, detail="Storage not available")
    resp = requests.get(
        f"{STORAGE_URL}/objects/{path}",
        headers={"X-Storage-Key": key}, timeout=60
    )
    resp.raise_for_status()
    return resp.content, resp.headers.get("Content-Type", "application/octet-stream")

# ============ Pydantic Models ============
class ContactFormCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    message: str

class ContactForm(ContactFormCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class QuoteRequestCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    company: Optional[str] = None
    service_required: str
    package: Optional[str] = None
    message: Optional[str] = None

class QuoteRequest(QuoteRequestCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class CareerApplicationCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    sia_license: Optional[str] = None
    experience_years: int
    cv_path: Optional[str] = None
    cover_letter: Optional[str] = None

class CareerApplication(CareerApplicationCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    cv_filename: Optional[str] = None
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class Testimonial(BaseModel):
    id: str
    name: str
    company: str
    role: str
    content: str
    rating: int

class Service(BaseModel):
    id: str
    title: str
    slug: str
    description: str
    icon: str
    features: List[str]

class Industry(BaseModel):
    id: str
    title: str
    slug: str
    description: str
    icon: str

class FAQ(BaseModel):
    id: str
    question: str
    answer: str
    category: str

# ============ Static Data ============
TESTIMONIALS = [
    Testimonial(id="1", name="James Richardson", company="Richardson Properties Ltd", role="Managing Director", 
                content="B21 Security has provided exceptional security services for our commercial properties for over 3 years. Their professionalism and reliability are unmatched.", rating=5),
    Testimonial(id="2", name="Sarah Mitchell", company="Nexus Events UK", role="Operations Manager",
                content="We've used B21 Security for multiple large-scale events. Their event security team is highly trained and always maintains a professional demeanor.", rating=5),
    Testimonial(id="3", name="David Thompson", company="BuildRight Construction", role="Site Manager",
                content="Outstanding construction site security. Since partnering with B21 Security, we've had zero incidents of theft or vandalism.", rating=5),
    Testimonial(id="4", name="Emma Clarke", company="Westfield Retail Park", role="Centre Manager",
                content="The retail security team from B21 Security has significantly improved our customer experience while maintaining top-tier security standards.", rating=5),
]

SERVICES = [
    Service(id="1", title="Manned Guarding", slug="manned-guarding", icon="UserCircle",
            description="Professional SIA-licensed security officers providing 24/7 protection for your premises. Our guards are trained in conflict resolution, first aid, and emergency response.",
            features=["24/7 Coverage", "SIA Licensed Officers", "Incident Reporting", "Access Control", "Patrol Services"]),
    Service(id="2", title="Event Security", slug="event-security", icon="Calendar",
            description="Comprehensive security solutions for events of all sizes, from corporate functions to large-scale festivals. We ensure your event runs smoothly and safely.",
            features=["Crowd Management", "VIP Protection", "Access Control", "Emergency Planning", "Steward Services"]),
    Service(id="3", title="Construction Site Security", slug="construction-security", icon="HardHat",
            description="Protect your construction site from theft, vandalism, and unauthorized access. Our guards monitor your valuable equipment and materials around the clock.",
            features=["24/7 Site Patrols", "Equipment Protection", "Access Logging", "Fire Watch", "Health & Safety Compliance"]),
    Service(id="4", title="CCTV Monitoring", slug="cctv-monitoring", icon="Eye",
            description="State-of-the-art remote CCTV monitoring from our central control room. Real-time surveillance with immediate incident response.",
            features=["24/7 Monitoring", "Instant Alerts", "Video Analytics", "Cloud Storage", "Remote Access"]),
    Service(id="5", title="Mobile Patrols", slug="mobile-patrols", icon="Car",
            description="Regular mobile security patrols covering multiple sites. Cost-effective security solution with visible deterrence and rapid response capability.",
            features=["Scheduled Patrols", "Random Checks", "Incident Response", "Key Holding", "Alarm Response"]),
    Service(id="6", title="Retail Security", slug="retail-security", icon="ShoppingBag",
            description="Specialized retail security to prevent shoplifting, manage customer flow, and ensure a safe shopping environment for customers and staff.",
            features=["Loss Prevention", "Customer Service", "CCTV Monitoring", "Staff Training", "Incident Management"]),
    Service(id="7", title="Dog Handling / K9 Security", slug="dog-handling", icon="Dog",
            description="Highly trained security dog units providing superior detection and deterrence capabilities. Our K9 teams are ideal for high-risk environments, large events, and perimeter security.",
            features=["Explosive Detection", "Drug Detection", "Intruder Deterrence", "Perimeter Patrols", "Search Operations", "SIA Licensed Handlers"]),
]

INDUSTRIES = [
    Industry(id="1", title="Corporate", slug="corporate", icon="Buildings", 
             description="Comprehensive security solutions for offices, headquarters, and corporate campuses. We protect your employees, assets, and confidential information."),
    Industry(id="2", title="Retail", slug="retail", icon="Storefront",
             description="Tailored security for shopping centres, retail parks, and individual stores. Reduce shrinkage while maintaining excellent customer experience."),
    Industry(id="3", title="Construction", slug="construction", icon="Crane",
             description="Protect your construction sites from theft, vandalism, and trespass. 24/7 coverage for sites of all sizes across the UK."),
    Industry(id="4", title="Residential", slug="residential", icon="House",
             description="Security services for residential developments, gated communities, and private estates. Peace of mind for homeowners and residents."),
    Industry(id="5", title="Events", slug="events", icon="Ticket",
             description="Professional event security for concerts, festivals, corporate events, and private functions. SIA licensed crowd management specialists."),
]

FAQS = [
    FAQ(id="1", question="Are your security guards SIA licensed?", answer="Yes, all our security officers hold valid SIA (Security Industry Authority) licenses. We maintain rigorous vetting processes and ensure all staff meet the highest industry standards.", category="General"),
    FAQ(id="2", question="What areas do you cover in the UK?", answer="We provide security services across England, Wales, and Scotland. Our main offices are in London, Manchester, and Birmingham, with regional teams throughout the UK.", category="General"),
    FAQ(id="3", question="How quickly can you deploy security personnel?", answer="For standard contracts, we typically require 48-72 hours notice. For emergency situations, we can often deploy within 24 hours depending on location and requirements.", category="Services"),
    FAQ(id="4", question="Do you provide security for one-off events?", answer="Yes, we provide security for events of all sizes, from small private functions to large-scale festivals. Contact us with your event details for a tailored quote.", category="Services"),
    FAQ(id="5", question="What training do your guards receive?", answer="All guards complete comprehensive training including conflict management, first aid, fire safety, and customer service. Many also hold additional certifications for specialized roles.", category="Training"),
    FAQ(id="6", question="Can you provide references from existing clients?", answer="Absolutely. We're proud of our client relationships and can provide references upon request. Many of our clients have been with us for over 5 years.", category="General"),
    FAQ(id="7", question="What are your pricing options?", answer="We offer flexible pricing including hourly rates, fixed contracts, and customized packages. Contact us for a free, no-obligation quote tailored to your specific needs.", category="Pricing"),
    FAQ(id="8", question="Do you offer CCTV installation as well as monitoring?", answer="While our core service is CCTV monitoring, we work with trusted partners for installation services. We can provide end-to-end solutions for your surveillance needs.", category="Services"),
]

# ============ API Routes ============
@api_router.get("/")
async def root():
    return {"message": "Secure Access UK API", "status": "online"}

# Contact Form
@api_router.post("/contact", response_model=ContactForm)
async def submit_contact(form: ContactFormCreate):
    contact = ContactForm(**form.model_dump())
    doc = contact.model_dump()
    await db.contacts.insert_one(doc)
    logger.info(f"New contact form submission from {form.email}")
    return contact

@api_router.get("/contacts", response_model=List[ContactForm])
async def get_contacts():
    contacts = await db.contacts.find({}, {"_id": 0}).to_list(1000)
    return contacts

# Quote Requests
@api_router.post("/quote", response_model=QuoteRequest)
async def submit_quote(form: QuoteRequestCreate):
    quote = QuoteRequest(**form.model_dump())
    doc = quote.model_dump()
    await db.quotes.insert_one(doc)
    logger.info(f"New quote request from {form.email} for {form.service_required}")
    return quote

@api_router.get("/quotes", response_model=List[QuoteRequest])
async def get_quotes():
    quotes = await db.quotes.find({}, {"_id": 0}).to_list(1000)
    return quotes

# Career Applications
@api_router.post("/careers/apply")
async def submit_application(
    name: str = File(...),
    email: str = File(...),
    phone: str = File(...),
    sia_license: str = File(None),
    experience_years: int = File(...),
    cover_letter: str = File(None),
    cv: UploadFile = File(None)
):
    cv_path = None
    cv_filename = None
    
    if cv:
        ext = cv.filename.split(".")[-1] if "." in cv.filename else "bin"
        allowed_exts = ["pdf", "doc", "docx"]
        if ext.lower() not in allowed_exts:
            raise HTTPException(status_code=400, detail="CV must be PDF, DOC, or DOCX")
        
        path = f"{APP_NAME}/cvs/{uuid.uuid4()}.{ext}"
        data = await cv.read()
        
        if len(data) > 5 * 1024 * 1024:  # 5MB limit
            raise HTTPException(status_code=400, detail="CV file too large (max 5MB)")
        
        try:
            result = put_object(path, data, cv.content_type or "application/octet-stream")
            cv_path = result["path"]
            cv_filename = cv.filename
        except Exception as e:
            logger.error(f"CV upload failed: {e}")
            # Continue without CV if upload fails
    
    application = CareerApplication(
        name=name,
        email=email,
        phone=phone,
        sia_license=sia_license,
        experience_years=experience_years,
        cv_path=cv_path,
        cv_filename=cv_filename,
        cover_letter=cover_letter
    )
    
    doc = application.model_dump()
    await db.applications.insert_one(doc)
    logger.info(f"New career application from {email}")
    
    return {"message": "Application submitted successfully", "id": application.id}

@api_router.post("/careers/apply-json", response_model=dict)
async def submit_application_json(form: CareerApplicationCreate):
    """Alternative endpoint for JSON submissions without CV"""
    application = CareerApplication(**form.model_dump())
    doc = application.model_dump()
    await db.applications.insert_one(doc)
    logger.info(f"New career application from {form.email}")
    return {"message": "Application submitted successfully", "id": application.id}

@api_router.get("/applications", response_model=List[CareerApplication])
async def get_applications():
    applications = await db.applications.find({}, {"_id": 0}).to_list(1000)
    return applications

# Static Data Endpoints
@api_router.get("/services", response_model=List[Service])
async def get_services():
    return SERVICES

@api_router.get("/services/{slug}", response_model=Service)
async def get_service(slug: str):
    for service in SERVICES:
        if service.slug == slug:
            return service
    raise HTTPException(status_code=404, detail="Service not found")

@api_router.get("/industries", response_model=List[Industry])
async def get_industries():
    return INDUSTRIES

@api_router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials():
    return TESTIMONIALS

@api_router.get("/faqs", response_model=List[FAQ])
async def get_faqs():
    return FAQS

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    try:
        init_storage()
    except Exception as e:
        logger.error(f"Storage initialization failed: {e}")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
