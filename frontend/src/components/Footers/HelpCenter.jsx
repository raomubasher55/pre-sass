import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "../homepage/Navbar";
import { HeroBanner } from "../homepage/HeroBanner";
import { FooterPrime } from "../presentation/FooterPrime";
import { AllAbouJumiaFooter } from "../presentation/AllAbouJumiaFooter";

// Modal content mapping for each help topic
const modalContentMap = {
  "Track Your Order": {
    title: "Track Your Order",
    content: (
      <div className="space-y-4">
        <p className="text-gray-700">Follow these steps to track your order:</p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Log into your account dashboard</li>
          <li>Navigate to "My Orders" section</li>
          <li>Find your order using the Order ID</li>
          <li>Click on "Track Order" button</li>
        </ol>
        <p className="text-gray-700 mt-4">You can also track your order directly using:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Order confirmation email</li>
          <li>SMS tracking link</li>
        </ul>
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">Need your Order ID? Check your order confirmation email or SMS.</p>
        </div>
      </div>
    )
  },
  "Shipping Options": {
    title: "Shipping Options",
    content: (
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800">Available Shipping Methods</h3>
        <div className="space-y-3">
          <div className="p-3 border rounded-lg">
            <h4 className="font-medium text-[#5A3ECB]">Standard Delivery</h4>
            <p className="text-gray-600">3-5 business days | Free for orders over $50</p>
          </div>
          <div className="p-3 border rounded-lg">
            <h4 className="font-medium text-[#5A3ECB]">Express Delivery</h4>
            <p className="text-gray-600">1-2 business days | Additional $15</p>
          </div>
          <div className="p-3 border rounded-lg">
            <h4 className="font-medium text-[#5A3ECB]">Same Day Delivery</h4>
            <p className="text-gray-600">Available in select cities | Additional $25</p>
          </div>
        </div>
      </div>
    )
  },
  "Payment Methods": {
    title: "Payment Methods",
    content: (
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800">Accepted Payment Methods</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 border rounded-lg">
            <h4 className="font-medium text-[#5A3ECB]">Credit/Debit Cards</h4>
            <p className="text-gray-600">Visa, Mastercard, American Express</p>
          </div>
          <div className="p-3 border rounded-lg">
            <h4 className="font-medium text-[#5A3ECB]">Digital Wallets</h4>
            <p className="text-gray-600">PayPal, Apple Pay, Google Pay</p>
          </div>
          <div className="p-3 border rounded-lg">
            <h4 className="font-medium text-[#5A3ECB]">Bank Transfer</h4>
            <p className="text-gray-600">Direct bank deposit or transfer</p>
          </div>
          <div className="p-3 border rounded-lg">
            <h4 className="font-medium text-[#5A3ECB]">Cash on Delivery</h4>
            <p className="text-gray-600">Available in select locations</p>
          </div>
        </div>
      </div>
    )
  },
  "Return Policy": {
    title: "Return Policy",
    content: (
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">30-Day Return Policy</h3>
          <p className="text-gray-700">Items can be returned within 30 days of delivery for a full refund.</p>
        </div>
        <div className="space-y-3">
          <h4 className="font-medium text-[#5A3ECB]">Return Requirements:</h4>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Item must be unused and in original packaging</li>
            <li>All tags and labels must be attached</li>
            <li>Original receipt or proof of purchase required</li>
            <li>Return shipping label will be provided</li>
          </ul>
        </div>
        <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
          <p className="text-sm text-yellow-800">Note: Some items like personalized goods and perishables cannot be returned.</p>
        </div>
      </div>
    )
  },
  "Refunds": {
    title: "Refunds",
    content: (
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">Refund Process Overview</h3>
          <p className="text-gray-700">Once your return is received and approved, we'll process your refund within 1-2 business days.</p>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-medium text-[#5A3ECB]">Refund Methods:</h4>
          <div className="grid grid-cols-1 gap-3">
            <div className="p-3 border rounded-lg">
              <h5 className="font-medium text-gray-800">Original Payment Method</h5>
              <p className="text-gray-600">Credit/Debit cards: 3-5 business days</p>
              <p className="text-gray-600">Digital wallets: 1-2 business days</p>
            </div>
            <div className="p-3 border rounded-lg">
              <h5 className="font-medium text-gray-800">Store Credit</h5>
              <p className="text-gray-600">Instant credit to your account</p>
              <p className="text-gray-600">+10% bonus on refund amount</p>
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">Tip: Choose store credit for faster refunds and bonus credit!</p>
        </div>
      </div>
    )
  },
  "Billing Questions": {
    title: "Billing Questions",
    content: (
      <div className="space-y-4">
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-800">Common Billing Questions</h3>
          
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium text-[#5A3ECB] mb-2">Why was I charged twice?</h4>
            <p className="text-gray-700">The first charge is usually a temporary authorization. It should disappear within 3-5 business days.</p>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium text-[#5A3ECB] mb-2">When will I be charged?</h4>
            <p className="text-gray-700">We only charge your payment method when your order ships.</p>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium text-[#5A3ECB] mb-2">Need a copy of your invoice?</h4>
            <ol className="list-decimal list-inside space-y-1 text-gray-700">
              <li>Log into your account</li>
              <li>Go to Order History</li>
              <li>Select the order</li>
              <li>Click "Download Invoice"</li>
            </ol>
          </div>
        </div>

        <div className="p-4 bg-yellow-50 rounded-lg">
          <p className="text-sm text-yellow-800">For specific billing issues, please contact our support team with your Order ID ready.</p>
        </div>
      </div>
    )
  },
  "Start a Return": {
    title: "Start a Return",
    content: (
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h3 className="font-semibold text-gray-800 mb-2">How to Start Your Return</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Sign in to your account</li>
            <li>Go to "Order History"</li>
            <li>Find the item you want to return</li>
            <li>Click "Return Item"</li>
            <li>Select return reason</li>
            <li>Choose refund method</li>
            <li>Print return label</li>
          </ol>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <div className="p-3 border rounded-lg">
            <h4 className="font-medium text-[#5A3ECB]">Return Label Options</h4>
            <p className="text-gray-600">Free return shipping for orders over $50</p>
            <p className="text-gray-600">$5.99 for all other returns</p>
          </div>
          
          <div className="p-3 border rounded-lg">
            <h4 className="font-medium text-[#5A3ECB]">Drop-off Locations</h4>
            <p className="text-gray-600">Any post office</p>
            <p className="text-gray-600">Authorized drop-off points</p>
            <p className="text-gray-600">Schedule pickup (additional fee)</p>
          </div>
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <p className="text-sm text-green-800">Pro tip: Keep your original packaging for easiest returns!</p>
        </div>
      </div>
    )
  },
  "Refund Timelines": {
    title: "Refund Timelines",
    content: (
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800">Expected Refund Processing Times</h3>
        
        <div className="space-y-3">
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium text-[#5A3ECB] mb-2">Return Shipping</h4>
            <p className="text-gray-700">3-5 business days to reach our warehouse</p>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium text-[#5A3ECB] mb-2">Processing Time</h4>
            <p className="text-gray-700">1-2 business days for inspection</p>
            <p className="text-gray-700">24 hours for refund initiation</p>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium text-[#5A3ECB] mb-2">Bank Processing</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Credit Cards: 3-5 business days</li>
              <li>Debit Cards: 5-7 business days</li>
              <li>PayPal: 1-2 business days</li>
              <li>Store Credit: Instant</li>
            </ul>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <div className="flex-1 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">Track your refund status anytime in your account dashboard under "Returns & Refunds"</p>
          </div>
        </div>
      </div>
    )
  },
  "Create an Account": {
    title: "Create an Account",
    content: (
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">How to Create Your Account</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Click the "Sign Up" button in the top right corner</li>
            <li>Enter your email address</li>
            <li>Create a strong password (min. 8 characters)</li>
            <li>Provide your basic information:
              <ul className="list-disc list-inside ml-4 mt-1 text-gray-600">
                <li>Full name</li>
                <li>Phone number</li>
                <li>Delivery address</li>
              </ul>
            </li>
            <li>Verify your email address</li>
          </ol>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <div className="p-3 border rounded-lg">
            <h4 className="font-medium text-[#5A3ECB]">Account Benefits</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Save multiple shipping addresses</li>
              <li>Track orders easily</li>
              <li>Access order history</li>
              <li>Get personalized recommendations</li>
              <li>Earn rewards points</li>
            </ul>
          </div>
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <p className="text-sm text-green-800">Get 10% off your first order when you create an account today!</p>
        </div>
      </div>
    )
  },
  "Update Account Info": {
    title: "Update Account Info",
    content: (
      <div className="space-y-4">
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-800">Managing Your Account Information</h3>
          
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium text-[#5A3ECB] mb-2">Personal Information</h4>
            <ol className="list-decimal list-inside space-y-1 text-gray-700">
              <li>Go to "My Account" settings</li>
              <li>Select "Personal Information"</li>
              <li>Update your details:
                <ul className="list-disc list-inside ml-4 mt-1 text-gray-600">
                  <li>Name</li>
                  <li>Email</li>
                  <li>Phone number</li>
                  <li>Date of birth</li>
                </ul>
              </li>
              <li>Click "Save Changes"</li>
            </ol>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium text-[#5A3ECB] mb-2">Address Book</h4>
            <p className="text-gray-700 mb-2">Manage your delivery addresses:</p>
            <ul className="list-disc list-inside text-gray-700">
              <li>Add new addresses</li>
              <li>Edit existing addresses</li>
              <li>Set default address</li>
              <li>Remove old addresses</li>
            </ul>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium text-[#5A3ECB] mb-2">Password & Security</h4>
            <ul className="list-disc list-inside text-gray-700">
              <li>Change password</li>
              <li>Update security questions</li>
              <li>Enable two-factor authentication</li>
            </ul>
          </div>
        </div>

        <div className="p-4 bg-yellow-50 rounded-lg">
          <p className="text-sm text-yellow-800">Remember to keep your contact information up to date for important order updates!</p>
        </div>
      </div>
    )
  },
  "Delete Account": {
    title: "Delete Account",
    content: (
      <div className="space-y-4">
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="font-semibold text-red-800 mb-2">Before You Delete Your Account</h3>
          <ul className="list-disc list-inside space-y-2 text-red-700">
            <li>This action cannot be undone</li>
            <li>All your data will be permanently deleted</li>
            <li>Active orders will still be processed</li>
            <li>Reward points will be lost</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-[#5A3ECB]">Account Deletion Process</h4>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Go to Account Settings</li>
            <li>Select "Delete Account" at the bottom</li>
            <li>Enter your password</li>
            <li>Select reason for deletion (optional)</li>
            <li>Confirm deletion</li>
          </ol>
        </div>

        <div className="p-4 border rounded-lg">
          <h4 className="font-medium text-[#5A3ECB] mb-2">What Gets Deleted</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Personal information</li>
            <li>Order history</li>
            <li>Saved addresses</li>
            <li>Reward points</li>
            <li>Saved items and preferences</li>
          </ul>
        </div>

        <div className="flex gap-4">
          <div className="flex-1 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">Consider temporarily deactivating your account instead of permanent deletion</p>
          </div>
        </div>
      </div>
    )
  },
  "Website Issues": {
    title: "Website Issues",
    content: (
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">Common Website Problems</h3>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg">
              <h4 className="font-medium text-[#5A3ECB]">Payment Processing Issues</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Clear your browser cache and cookies</li>
                <li>Try a different payment method</li>
                <li>Check if your card is expired</li>
                <li>Ensure billing address matches card info</li>
              </ul>
            </div>
            
            <div className="p-3 border rounded-lg">
              <h4 className="font-medium text-[#5A3ECB]">Loading Problems</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Check your internet connection</li>
                <li>Try refreshing the page</li>
                <li>Clear browser cache</li>
                <li>Try a different browser</li>
              </ul>
            </div>
            
            <div className="p-3 border rounded-lg">
              <h4 className="font-medium text-[#5A3ECB]">Login Issues</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Reset your password</li>
                <li>Check caps lock is off</li>
                <li>Clear browser cookies</li>
                <li>Try incognito/private mode</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">System Requirements</h4>
          <ul className="list-disc list-inside space-y-1 text-blue-700">
            <li>Updated browser (Chrome, Firefox, Safari, Edge)</li>
            <li>JavaScript enabled</li>
            <li>Cookies enabled</li>
            <li>Stable internet connection</li>
          </ul>
        </div>

        <div className="p-4 bg-yellow-50 rounded-lg">
          <p className="text-sm text-yellow-800">Still having issues? Contact our technical support team with your browser details and screenshots of the problem.</p>
        </div>
      </div>
    )
  },
  "Mobile App": {
    title: "Mobile App Support",
    content: (
      <div className="space-y-4">
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-800">App Support & Troubleshooting</h3>
          
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium text-[#5A3ECB] mb-2">Installation Issues</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Check device compatibility</li>
              <li>Ensure sufficient storage space</li>
              <li>Update your operating system</li>
              <li>Restart your device</li>
            </ul>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium text-[#5A3ECB] mb-2">Common App Problems</h4>
            <div className="space-y-2">
              <p className="font-medium text-gray-700">App Crashing:</p>
              <ul className="list-disc list-inside ml-2 text-gray-600">
                <li>Force close and restart the app</li>
                <li>Clear app cache</li>
                <li>Uninstall and reinstall</li>
              </ul>
              
              <p className="font-medium text-gray-700 mt-3">Login Issues:</p>
              <ul className="list-disc list-inside ml-2 text-gray-600">
                <li>Check internet connection</li>
                <li>Update to latest version</li>
                <li>Reset password if needed</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Minimum Requirements</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-blue-800">iOS:</p>
                <ul className="list-disc list-inside text-blue-700">
                  <li>iOS 13 or later</li>
                  <li>200MB free space</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-blue-800">Android:</p>
                <ul className="list-disc list-inside text-blue-700">
                  <li>Android 8.0 or later</li>
                  <li>250MB free space</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <p className="text-sm text-green-800">Keep your app updated to access the latest features and bug fixes!</p>
        </div>
      </div>
    )
  },
  "Report a Bug": {
    title: "Report a Bug",
    content: (
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">How to Report a Bug</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Document the issue with screenshots</li>
            <li>Note the steps to reproduce the bug</li>
            <li>Check if the issue persists after clearing cache</li>
            <li>Submit bug report with details below</li>
          </ol>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-[#5A3ECB]">Information to Include</h4>
          <div className="grid grid-cols-1 gap-3">
            <div className="p-3 border rounded-lg">
              <h5 className="font-medium text-gray-800">Device Details</h5>
              <ul className="list-disc list-inside text-gray-700">
                <li>Device type (desktop/mobile)</li>
                <li>Operating system & version</li>
                <li>Browser & version</li>
                <li>App version (if applicable)</li>
              </ul>
            </div>
            
            <div className="p-3 border rounded-lg">
              <h5 className="font-medium text-gray-800">Bug Information</h5>
              <ul className="list-disc list-inside text-gray-700">
                <li>What happened vs. what you expected</li>
                <li>Steps to reproduce the issue</li>
                <li>When the issue started</li>
                <li>How often it occurs</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">Quick Report Options</h4>
          <div className="space-y-2">
            <p className="text-blue-700">In-App: Settings > Help > Report Bug</p>
            <p className="text-blue-700">Website: Footer > Bug Report Form</p>
            <p className="text-blue-700">Email: bugs@support.com</p>
          </div>
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <p className="text-sm text-green-800">Thank you for helping us improve! We review all bug reports and prioritize fixes based on impact.</p>
        </div>
      </div>
    )
  },

  // Add more modal conte
};

const helpCategories = [
  { title: "Orders and Shipping", links: ["Track Your Order", "Shipping Options", "Order Issues"] },
  { title: "Payments", links: ["Payment Methods", "Refunds", "Billing Questions"] },
  { title: "Returns", links: ["Return Policy", "Start a Return", "Refund Timelines"] },
  { title: "Account", links: ["Create an Account", "Update Account Info", "Delete Account"] },
  { title: "Technical Support", links: ["Website Issues", "Mobile App", "Report a Bug"] },
];

const quickLinks = [
  "Help Center Home",
  "Contact Us",
  "FAQs",
  "Community Forum",
  "Privacy Policy",
  "Terms of Service",
];

export default function HelpCenter() {
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => {
    setModalContent(modalContentMap[content] || {
      title: content,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">Information about {content} will be available soon.</p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              For immediate assistance, please contact our support team.
            </p>
          </div>
        </div>
      )
    });
  };

  const closeModal = () => {
    setModalContent(null);
  };

  return (
    <>
      <HeroBanner />
      <Navbar />
      <div className="bg-gray-100 min-h-screen p-6">
        <div className="container mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[#5A3ECB] mb-4">Help Center</h1>
            <p className="text-lg text-gray-600">How can we assist you today?</p>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-12">
            <input
              type="text"
              placeholder="Search for help..."
              className="w-full p-4 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5A3ECB]"
            />
          </div>

          {/* Help Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {helpCategories.map((category, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h2 className="text-xl font-semibold text-[#5A3ECB] mb-4">{category.title}</h2>
                <ul className="space-y-2">
                  {category.links.map((link, i) => (
                    <li key={i}>
                      <button
                        onClick={() => openModal(link)}
                        className="text-blue-600 hover:underline"
                      >
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Quick Links */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-12">
            <h2 className="text-xl font-semibold text-[#5A3ECB] mb-4">Quick Links</h2>
            <div className="flex flex-wrap gap-4">
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  to={`/help/${link.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-blue-600 hover:underline"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-[#5A3ECB] text-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold mb-4">Still Need Help?</h2>
            <p className="mb-4">
              Our support team is available 24/7 to assist you with any questions or concerns.
            </p>
            <Link
              to="/help/contact-us"
              className="inline-block bg-white text-[#5A3ECB] px-6 py-2 rounded-lg font-medium shadow-md hover:bg-gray-100 transition"
            >
              Contact Support
            </Link>
          </div>
        </div>

        {/* Modal */}
        {modalContent && (
          <div
            className="fixed inset-0 flex items-center justify-center overflow-y-scroll z-50 bg-black bg-opacity-50"
            onClick={closeModal}
          >
            <div 
              className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg m-4"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-[#5A3ECB]">{modalContent.title}</h2>
                <button 
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-800 p-2"
                >
                  ✕
                </button>
              </div>
              <div className="mt-4">
                {modalContent.content}
              </div>
            </div>
          </div>
        )}
      </div>
      <FooterPrime />
      <AllAbouJumiaFooter />
    </>
  );
}