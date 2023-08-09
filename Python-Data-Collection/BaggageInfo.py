import requests
from bs4 import BeautifulSoup

# Function to scrape baggage policy from United Airlines
def scrape_united_baggage():
    url = "https://www.united.com/en/us/fly/travel/baggage.html"
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")
    
    # Extract baggage policy information
    policy_sections = soup.find_all("div", class_="tab-content")
    for section in policy_sections:
        print("United Airlines Baggage Policy:")
        print(section.get_text().strip())
        print("-" * 50)

# Function to scrape baggage policy from Delta Airlines
def scrape_delta_baggage():
    url = "https://www.delta.com/us/en/baggage/overview"
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")
    
    # Extract baggage policy information
    policy_section = soup.find("div", class_="Baggage-mainContent")
    if policy_section:
        print("Delta Airlines Baggage Policy:")
        print(policy_section.get_text().strip())
        print("-" * 50)

# Call the functions to print baggage policy information
scrape_united_baggage()
scrape_delta_baggage()
