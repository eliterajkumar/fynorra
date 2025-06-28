export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Fynorra",
    "url": "https://www.fynorra.com",
    "logo": "https://www.fynorra.com/logo.png",
    "description": "Fynorra helps businesses automate and grow with tailored AI chatbots, custom LLMs, software development, and scalable DevOps solutions.",
    "foundingDate": "2023",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "url": "https://www.fynorra.com/contact"
    },
    "sameAs": [
      "https://twitter.com/fynorra",
      "https://linkedin.com/company/fynorra"
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 40.7128,
        "longitude": -74.0060
      },
      "geoRadius": "50000"
    }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Custom AI Solutions & Chatbots",
    "description": "Enterprise-grade AI solutions including custom chatbots, machine learning models, software development, and cloud DevOps services.",
    "provider": {
      "@type": "Organization",
      "name": "Fynorra"
    },
    "serviceType": [
      "AI Chatbot Development",
      "Custom AI Models",
      "Software Development",
      "Cloud & DevOps",
      "AI Integration",
      "Enterprise Automation"
    ],
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "AI & Software Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom AI Chatbots",
            "description": "Intelligent chatbots with natural language processing for customer service and business automation."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Integration & Automation",
            "description": "Seamless AI integration into existing systems with workflow automation capabilities."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Software Development",
            "description": "End-to-end software development services for web, mobile, and enterprise applications."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Cloud & DevOps",
            "description": "Cloud migration, infrastructure optimization, and DevOps practices for scalable solutions."
          }
        }
      ]
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Fynorra",
    "url": "https://www.fynorra.com",
    "description": "Custom AI Solutions & Chatbots for Enterprise Growth",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.fynorra.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much does a custom AI chatbot cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Custom AI chatbot pricing varies based on complexity, features, and integration requirements. Basic chatbots start around $5,000, while enterprise solutions with advanced features can range from $15,000 to $50,000+. We provide detailed quotes after understanding your specific needs and use cases."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to develop a custom AI solution?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Development timelines depend on the complexity of your AI solution. Simple chatbots can be ready in 2-4 weeks, while complex enterprise AI systems may take 3-6 months. We follow agile methodologies to deliver working prototypes quickly and iterate based on feedback."
        }
      },
      {
        "@type": "Question",
        "name": "Can your AI chatbots integrate with our existing systems?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Our AI chatbots are designed for seamless integration with your existing CRM, ERP, helpdesk, and other business systems. We support APIs, webhooks, and custom integrations for platforms like Salesforce, HubSpot, Zendesk, and more."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </>
  );
} 