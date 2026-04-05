import requests
import sys
import json
from datetime import datetime

class B21SecurityAPITester:
    def __init__(self, base_url="https://trusted-guards-uk.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None, files=None):
        """Run a single API test"""
        url = f"{self.base_url}/api/{endpoint}"
        headers = {'Content-Type': 'application/json'} if not files else {}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=30)
            elif method == 'POST':
                if files:
                    response = requests.post(url, data=data, files=files, timeout=30)
                else:
                    response = requests.post(url, json=data, headers=headers, timeout=30)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    if isinstance(response_data, list):
                        print(f"   Response: List with {len(response_data)} items")
                    elif isinstance(response_data, dict):
                        print(f"   Response keys: {list(response_data.keys())}")
                except:
                    print(f"   Response: {response.text[:100]}...")
            else:
                self.failed_tests.append({
                    'test': name,
                    'expected': expected_status,
                    'actual': response.status_code,
                    'response': response.text[:200]
                })
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}")

            return success, response.json() if success and response.content else {}

        except Exception as e:
            self.failed_tests.append({
                'test': name,
                'error': str(e)
            })
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test API root endpoint"""
        return self.run_test("API Root", "GET", "", 200)

    def test_services_endpoint(self):
        """Test services endpoint"""
        success, response = self.run_test("Get Services", "GET", "services", 200)
        if success and response:
            services = response
            print(f"   Found {len(services)} services")
            # Check for Dog Handling / K9 Security
            dog_handling_found = any("Dog Handling" in service.get('title', '') for service in services)
            if dog_handling_found:
                print("   ✅ Dog Handling / K9 Security service found")
            else:
                print("   ❌ Dog Handling / K9 Security service NOT found")
                self.failed_tests.append({
                    'test': 'Dog Handling Service Check',
                    'error': 'Dog Handling / K9 Security service not found in services list'
                })
        return success

    def test_testimonials_endpoint(self):
        """Test testimonials endpoint"""
        success, response = self.run_test("Get Testimonials", "GET", "testimonials", 200)
        if success and response:
            print(f"   Found {len(response)} testimonials")
        return success

    def test_industries_endpoint(self):
        """Test industries endpoint"""
        success, response = self.run_test("Get Industries", "GET", "industries", 200)
        if success and response:
            print(f"   Found {len(response)} industries")
        return success

    def test_faqs_endpoint(self):
        """Test FAQs endpoint"""
        success, response = self.run_test("Get FAQs", "GET", "faqs", 200)
        if success and response:
            print(f"   Found {len(response)} FAQs")
        return success

    def test_contact_form(self):
        """Test contact form submission"""
        test_data = {
            "name": "Test User",
            "email": "test@example.com",
            "phone": "+44 7943 715313",
            "message": "This is a test message for B21 Security contact form."
        }
        success, response = self.run_test("Submit Contact Form", "POST", "contact", 200, data=test_data)
        if success and response:
            print(f"   Contact ID: {response.get('id', 'N/A')}")
        return success

    def test_quote_form(self):
        """Test quote request submission"""
        test_data = {
            "name": "Test Business Owner",
            "email": "business@example.com",
            "phone": "+44 7943 715313",
            "company": "Test Company Ltd",
            "service_required": "Manned Guarding",
            "package": "Standard",
            "message": "We need security services for our office building."
        }
        success, response = self.run_test("Submit Quote Request", "POST", "quote", 200, data=test_data)
        if success and response:
            print(f"   Quote ID: {response.get('id', 'N/A')}")
        return success

    def test_career_application_json(self):
        """Test career application submission (JSON)"""
        test_data = {
            "name": "Test Applicant",
            "email": "applicant@example.com",
            "phone": "+44 7943 715313",
            "sia_license": "SIA123456",
            "experience_years": 5,
            "cover_letter": "I am interested in joining B21 Security as a security officer."
        }
        success, response = self.run_test("Submit Career Application (JSON)", "POST", "careers/apply-json", 200, data=test_data)
        if success and response:
            print(f"   Application ID: {response.get('id', 'N/A')}")
        return success

    def test_get_contacts(self):
        """Test getting contacts (admin endpoint)"""
        return self.run_test("Get Contacts", "GET", "contacts", 200)

    def test_get_quotes(self):
        """Test getting quotes (admin endpoint)"""
        return self.run_test("Get Quotes", "GET", "quotes", 200)

    def test_get_applications(self):
        """Test getting applications (admin endpoint)"""
        return self.run_test("Get Applications", "GET", "applications", 200)

def main():
    print("🚀 Starting B21 Security API Testing...")
    print("=" * 60)
    
    tester = B21SecurityAPITester()
    
    # Test all endpoints
    tests = [
        tester.test_root_endpoint,
        tester.test_services_endpoint,
        tester.test_testimonials_endpoint,
        tester.test_industries_endpoint,
        tester.test_faqs_endpoint,
        tester.test_contact_form,
        tester.test_quote_form,
        tester.test_career_application_json,
        tester.test_get_contacts,
        tester.test_get_quotes,
        tester.test_get_applications,
    ]
    
    for test in tests:
        test()
    
    # Print results
    print("\n" + "=" * 60)
    print(f"📊 Test Results: {tester.tests_passed}/{tester.tests_run} tests passed")
    
    if tester.failed_tests:
        print("\n❌ Failed Tests:")
        for failure in tester.failed_tests:
            print(f"   - {failure.get('test', 'Unknown')}: {failure.get('error', failure.get('response', 'Unknown error'))}")
    
    success_rate = (tester.tests_passed / tester.tests_run) * 100 if tester.tests_run > 0 else 0
    print(f"📈 Success Rate: {success_rate:.1f}%")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())