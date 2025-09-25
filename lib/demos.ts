
export type Demo = {
  id: string;
  title: string;
  subtitle: string;
  locations?: string[];
  greeting: string;
  services: {
    id: string;
    name: string;
    short: string;
    price: string;
  }[];
  sample_user_queries: string[];
  assistant_replies: {
    match: string;
    reply: string;
    should_offer_book: boolean;
  }[];
  happy_flow: {
    scenario: string;
    final_cta_text: string;
  };
  lead_capture_fields: string[];
  seed_data: {
    type: string;
    id: string;
    title: string;
    meta: string;
  }[];
  notes: string;
};

const DEMOS: Demo[] = [
  {
    id: "jewelry",
    title: "Jewelry Sales Assistant",
    subtitle: "Product Q&A & Booking",
    locations: ["Midtown"],
    greeting: "Welcome to Midtown Jewelers — I'm your shopping assistant. Looking for rings, bracelets, or an appointment?",
    services: [
      {id:"engage", name:"Engagement Rings", short:"Curated diamonds & settings", price:"$500–$20,000"},
      {id:"custom", name:"Custom Design", short:"Tailored design sessions", price:"From $300"}
    ],
    sample_user_queries:[
      "Diamond rings under $1,000",
      "Which size fits a 7?",
      "Book viewing tomorrow 4pm",
      "Do you offer financing?"
    ],
    assistant_replies:[
      {match:"diamond", reply:"Top pick: Luna Ring — 14K, $850. Want to book a viewing?", should_offer_book:true},
      {match:"size", reply:"Size 7 matches an inner diameter of 17.3mm — we can verify in-store.", should_offer_book:false},
      {match:"book", reply:"I can reserve a viewing tomorrow 4pm — please share name & phone.", should_offer_book:true},
      {match:"finance", reply:"We offer in-store financing partners — I can send a pre-qual link.", should_offer_book:false}
    ],
    happy_flow:{
      scenario:"Customer asks for affordable diamonds → assistant shows options → books viewing → sends confirmation SMS.",
      final_cta_text:"Book viewing — Live"
    },
    lead_capture_fields:["name","phone","email","preferred_datetime","item_interest"],
    seed_data:[ {type:"product", id:"luna-ring", title:"Luna Ring", meta:"14K, $850"} ],
    notes:"RAG-key: jewelry_catalog"
  },

  {
    id: "storefront",
    title: "Storefront FAQ",
    subtitle: "Shipping & Policies",
    locations:["Main Street"],
    greeting:"Hi — welcome! I can answer store hours, returns, and stock. What do you want to know?",
    services:[
      {id:"shipping", name:"Shipping", short:"Same-day & standard options", price:"Varies"},
      {id:"returns", name:"Returns", short:"14-day returns policy", price:"Free return"}
    ],
    sample_user_queries:[
      "What is your return policy?",
      "Do you deliver same-day?",
      "Is size M available?"
    ],
    assistant_replies:[
      {match:"return", reply:"We accept returns within 14 days if unworn. I can email the return label.", should_offer_book:false},
      {match:"deliver", reply:"Same-day delivery available for orders placed before 1pm within city limits.", should_offer_book:false},
      {match:"size", reply:"Size M is in stock (2 units). Want me to reserve one?", should_offer_book:true}
    ],
    happy_flow:{ scenario:"Customer asks returns → assistant confirms policy → reserves item → records lead.", final_cta_text:"Reserve item" },
    lead_capture_fields:["name","phone","email","sku","pickup_or_delivery"],
    seed_data:[ {type:"policy", id:"ret14", title:"14-day Return", meta:"Conditions: unworn, receipt required"} ],
    notes:"RAG-key: storefront_faq_docs"
  },

  {
    id: "restaurant",
    title: "Restaurant Reservations",
    subtitle: "Menu & Booking",
    locations:["Bistro Downtown"],
    greeting:"Welcome to The Bistro — I can recommend dishes and book tables. Any dietary needs?",
    services:[
      {id:"dinner", name:"Dinner seating", short:"Multi-course tasting", price:"$45–$95/person"},
      {id:"private", name:"Private dining", short:"Small-group bookings", price:"Contact us"}
    ],
    sample_user_queries:[
      "Gluten-free options?",
      "Table for 3 Sat 8pm",
      "Any chef specials?"
    ],
    assistant_replies:[
      {match:"gluten", reply:"We have a GF pasta (contains nuts). I can mark allergy on booking.", should_offer_book:true},
      {match:"table", reply:"Table for 3 on Sat 8pm available — shall I reserve it? Please provide a name.", should_offer_book:true},
      {match:"special", reply:"Tonight's special: seared sea bass with lemon beurre blanc.", should_offer_book:false}
    ],
    happy_flow:{ scenario:"Guest asks for GF options → assistant suggests dish → books table → sends confirmation.", final_cta_text:"Reserve table" },
    lead_capture_fields:["name","phone","party_size","datetime","dietary_notes"],
    seed_data:[ {type:"menu", id:"gf-pasta", title:"GF Pasta", meta:"45 min, contains nuts"} ],
    notes:"RAG-key: restaurant_menu_docs"
  },
  {
    id: "salon-chain",
    title: "Glow & Co — Salon Chain",
    subtitle: "Book hair, nails & spa across 12 locations — instant availability",
    locations: ["Downtown","Uptown","Mall Branch"],
    greeting: "Welcome to Glow & Co — I’m your booking assistant. Do you want hair, nails, or a spa treatment today?",
    services: [
      {id:"haircut", name:"Haircut", short:"45 min with senior stylist", price:"$45"},
      {id:"color", name:"Full Colour", short:"2–3 hours, includes toner", price:"$120"},
      {id:"manicure", name:"Signature Manicure", short:"45 min shellac finish", price:"$35"}
    ],
    sample_user_queries:[
      "Do you have appointments tomorrow?",
      "How much is a full colour?",
      "Can I request a senior stylist?",
      "Cancel my booking",
      "Where is your Downtown branch?"
    ],
    assistant_replies:[
      {match:"appointment", reply:"I have openings tomorrow 10am, 2pm and 4pm at Downtown. Which time works?", should_offer_book:true},
      {match:"price", reply:"Full Colour is typically $120 — final price depends on hair length. Want an estimate?", should_offer_book:false},
      {match:"stylist", reply:"Yes — our senior stylists are available Thu & Sat. Would you like me to reserve with a senior?", should_offer_book:true},
      {match:"cancel", reply:"I can cancel that booking — please confirm your booking ID or phone.", should_offer_book:false},
      {match:"directions", reply:"Our Downtown salon is at 110 Main St, 2nd floor — free parking at rear.", should_offer_book:false}
    ],
    happy_flow:{
      scenario:"Visitor asks about colour → assistant suggests package → books 2pm slot → sends SMS confirmation.",
      final_cta_text:"Book a slot — Live"
    },
    lead_capture_fields:["name","phone","email","preferred_date","location"],
    seed_data:[{type:"service", id:"color", title:"Full Colour", meta:"2h, $120, includes toner"}],
    notes:"RAG-key: salon_chain_docs"
  },
  {
    id: "urban-salon",
    title: "Urban Shears — Boutique Salon",
    subtitle: "Premium stylists, same-week bookings",
    locations: ["Urban Shears — Main Street"],
    greeting: "Hello from Urban Shears — we offer boutique styling and same-week slots. What service would you like?",
    services:[
      {id:"cut", name:"Boutique Haircut", short:"60 min with senior stylist", price:"$65"},
      {id:"keratin", name:"Keratin Treatment", short:"90–120 min smoothing", price:"$180"}
    ],
    sample_user_queries:[
      "First-time customer price?",
      "Do you have Keratin this week?",
      "Can I request stylist Rina?"
    ],
    assistant_replies:[
      {match:"first", reply:"Welcome! First-time haircut is $55 — includes wash and styling. Want to book?", should_offer_book:true},
      {match:"keratin", reply:"Keratin available Wed & Fri — 11am and 3pm open. Should I reserve one?", should_offer_book:true},
      {match:"rina", reply:"Rina is available Tue & Thu evenings. Shall I book with Rina?", should_offer_book:true}
    ],
    happy_flow:{
      scenario:"Customer asks for stylist → assistant checks availability → reserves slot → sends confirmation and pre-visit tips.",
      final_cta_text:"Reserve with stylist"
    },
    lead_capture_fields:["name","phone","preferred_stylist","preferred_date","notes"],
    seed_data:[{type:"service", id:"cut", title:"Boutique Haircut", meta:"60min, $65"}],
    notes:"RAG-key: urban_salon_docs"
  },
  {
    id: "realestate",
    title: "Real Estate Agent",
    subtitle: "Listing Q&A & Showings",
    locations:["Main St","Riverside"],
    greeting:"Hi — I can show listings, HOA fees, and book showings. Which property are you interested in?",
    services:[
      {id:"2bed", name:"2-Bed Apartments", short:"City & riverside options", price:"$300k–$650k"},
      {id:"viewing", name:"Showings", short:"Schedule in-person or virtual", price:"Free"}
    ],
    sample_user_queries:[
      "Is 2-bed Main St available?",
      "What are HOA fees?",
      "View Sat 11am?"
    ],
    assistant_replies:[
      {match:"2-bed", reply:"2-bed at Main St is active — $420k. Want to schedule a showing?", should_offer_book:true},
      {match:"hoa", reply:"HOA fees are $250/mo — includes landscaping and security.", should_offer_book:false},
      {match:"view", reply:"I can book Sat 11am — please confirm contact details.", should_offer_book:true}
    ],
    happy_flow:{ scenario:"User asks about a property → assistant confirms availability → schedules viewing → saves lead + follow-up.", final_cta_text:"Schedule viewing" },
    lead_capture_fields:["name","phone","email","property_id","preferred_date"],
    seed_data:[ {type:"listing", id:"main-2b", title:"Main St 2-Bed", meta:"$420k, HOA $250/mo"} ],
    notes:"RAG-key: listings_index"
  },

  {
    id: "dental",
    title: "Dental Clinic Assistant",
    subtitle: "Triage & Booking",
    locations:["Downtown Dental"],
    greeting:"Hello — I'm the clinic assistant. Describe your symptoms and I’ll recommend next steps and available slots.",
    services:[
      {id:"check", name:"Dental Check-up", short:"Routine exam & cleaning", price:"$80"},
      {id:"urgent", name:"Urgent care", short:"Same-day pain triage", price:"$120"}
    ],
    sample_user_queries:[
      "I have a toothache",
      "Next Wed availability?",
      "Do you accept Insurance X?"
    ],
    assistant_replies:[
      {match:"toothache", reply:"If severe swelling, go to emergency. Otherwise we have Wed 10am available for triage.", should_offer_book:true},
      {match:"next", reply:"Next Wed has 10am, 2pm slots. Book one?", should_offer_book:true},
      {match:"insurance", reply:"We accept Insurance X — co-pay usually $20. I can confirm with your insurer if you share details.", should_offer_book:false}
    ],
    happy_flow:{ scenario:"Patient reports toothache → assistant triages → books urgent slot → sends SMS + intake form.", final_cta_text:"Book urgent slot" },
    lead_capture_fields:["name","phone","insurance_provider","symptoms","preferred_date"],
    seed_data:[ {type:"service", id:"urgent", title:"Urgent Triage", meta:"30 min, $120"} ],
    notes:"RAG-key: clinic_docs"
  },

  {
    id: "fashion",
    title: "E-commerce Stylist",
    subtitle: "Recommendations & Checkout",
    locations:["Online Store"],
    greeting:"Hi! Tell me the event and your size — I’ll suggest outfits and add to cart for you.",
    services:[
      {id:"styling", name:"Styling Session", short:"Outfit recommendations", price:"Free"},
      {id:"personal", name:"Personal Fitting", short:"Virtual fitting guidance", price:"$20"}
    ],
    sample_user_queries:[
      "What to wear to a wedding?",
      "Shoes for size 9?",
      "Show matching bags"
    ],
    assistant_replies:[
      {match:"wedding", reply:"Try the Aurora Dress + Mila heels — elegant and wedding-safe. Add to cart?", should_offer_book:true},
      {match:"shoes", reply:"We have size 9 in Mila heels. Would you like the shoe size chart link?", should_offer_book:false},
      {match:"bag", reply:"Matching 'Aurora Clutch' pairs well — add to cart?", should_offer_book:true}
    ],
    happy_flow:{ scenario:"Customer asks outfit → assistant suggests full look → adds to cart → customer checks out.", final_cta_text:"Add to cart" },
    lead_capture_fields:["name","email","size","shipping_address","promo_code"],
    seed_data:[ {type:"product", id:"aurora-dress", title:"Aurora Dress", meta:"Size XS–XL, $120"} ],
    notes:"RAG-key: ecommerce_catalog"
  },

  {
    id: "legal",
    title: "Legal Intake Assistant",
    subtitle: "Intake & Document Upload",
    locations:["Virtual"],
    greeting:"Hello — I can help you start an intake. Briefly describe your issue and upload relevant documents.",
    services:[
      {id:"intake", name:"Initial Intake", short:"Case screening & docs", price:"$150"},
      {id:"consult", name:"Consultation", short:"Follow-up attorney consult", price:"$200/hr"}
    ],
    sample_user_queries:[
      "Can I sue for breach?",
      "How much will it cost?",
      "What docs required?"
    ],
    assistant_replies:[
      {match:"sue", reply:"You may have a claim. Upload the contract and I’ll flag key clauses for review.", should_offer_book:true},
      {match:"cost", reply:"We charge an intake fee of $150. Hourly rates typically $200/hr.", should_offer_book:false},
      {match:"docs", reply:"Please upload contract, invoices, and correspondence related to the dispute.", should_offer_book:false}
    ],
    happy_flow:{ scenario:"Client uploads contract → assistant extracts key clauses → schedules attorney consult → intake saved.", final_cta_text:"Start intake" },
    lead_capture_fields:["name","email","phone","case_type","file_upload"],
    seed_data:[ {type:"doc", id:"contract-sample", title:"Sample Contract", meta:"PDF 1.2MB"} ],
    notes:"RAG-key: legal_kb"
  },

  {
    id: "education",
    title: "A-Level Tutor Bot",
    subtitle: "Subject Tutor & Marking",
    locations:["Online"],
    greeting:"Hi — I’m your A-Level tutor. Upload a question or type one and I’ll give step-by-step answers and LaTeX where needed.",
    services:[
      {id:"maths", name:"Maths Tutoring", short:"Step-by-step solutions", price:"$25/session"},
      {id:"economics", name:"Economics support", short:"Exam-style answers", price:"$20/session"}
    ],
    sample_user_queries:[
      "Solve ∫ x^2 dx",
      "Explain KAA method in econ",
      "Mark my PDF answer"
    ],
    assistant_replies:[
      {match:"integral", reply:"∫ x^2 dx = x^3/3 + C. Common mistake: forgetting +C.", should_offer_book:false},
      {match:"kaa", reply:"KAA = Knowledge, Application, Analysis — structure your answer that way.", should_offer_book:false},
      {match:"mark", reply:"Upload your PDF and I’ll highlight errors and give a grade estimate.", should_offer_book:true}
    ],
    happy_flow:{ scenario:"Student uploads paper → assistant marks with LaTeX solutions → offers paid tutoring session.", final_cta_text:"Request tutor session" },
    lead_capture_fields:["student_name","email","subject","school","file_upload"],
    seed_data:[ {type:"example", id:"int-1", title:"Integral example", meta:"maths"} ],
    notes:"RAG-key: tutor_kb"
  },

  {
    id: "voice-sales",
    title: "Voice Sales Caller",
    subtitle: "Outbound Bookings",
    locations:["Remote"],
    greeting:"Hi — I’m your outbound AI caller. I can qualify leads and offer booking links. Shall I call sample lead?",
    services:[
      {id:"qualify", name:"Lead Qualification", short:"Automated call qualification", price:"Per-call"},
      {id:"book", name:"Appointment Booking", short:"Add to calendar", price:"Per-book"}
    ],
    sample_user_queries:[
      "Call lead and qualify",
      "Ask budget & pain",
      "Book 30min discovery"
    ],
    assistant_replies:[
      {match:"call", reply:"I’ll call leads, ask budget and needs, and book discovery if interested.", should_offer_book:true},
      {match:"budget", reply:"What budget range are you considering? I can log it to CRM.", should_offer_book:false},
      {match:"book", reply:"Booked a 30min discovery — send calendar invite? Provide email.", should_offer_book:true}
    ],
    happy_flow:{ scenario:"Agent phones lead → qualifies → books discovery → calendar invite and CRM note saved.", final_cta_text:"Run outbound call" },
    lead_capture_fields:["lead_name","phone","email","budget","interest_notes"],
    seed_data:[ {type:"script", id:"sales-script", title:"Discovery script", meta:"questions list"} ],
    notes:"RAG-key: voice_agent_docs"
  },

  {
    id: "facilities",
    title: "Facilities Ticketing",
    subtitle: "Issue Logging & Scheduling",
    locations:["Building A"],
    greeting:"Welcome — report the issue and I’ll schedule maintenance and create a ticket.",
    services:[
      {id:"ticket", name:"Create ticket", short:"Issue tracking & scheduling", price:"N/A"},
      {id:"maintenance", name:"Maintenance visit", short:"Technician scheduling", price:"From $50"}
    ],
    sample_user_queries:[
      "Heater broken — urgent",
      "Next cleaning?",
      "Show open tickets 3B"
    ],
    assistant_replies:[
      {match:"heater", reply:"Heater logged as urgent — technician available today 2–4pm. Confirm tenant name?", should_offer_book:true},
      {match:"clean", reply:"Next scheduled cleaning is Friday AM — want to request extra service?", should_offer_book:false},
      {match:"tickets", reply:"Open tickets for 3B: #987 (heater). Want updates sent to email?", should_offer_book:false}
    ],
    happy_flow:{ scenario:"Tenant reports heater → assistant creates urgent ticket → schedules tech → confirms ETA.", final_cta_text:"Create ticket" },
    lead_capture_fields:["tenant_name","apartment","phone","issue_priority","preferred_time"],
    seed_data:[ {type:"ticket", id:"t987", title:"Heater failure", meta:"urgent"} ],
    notes:"RAG-key: facilities_index"
  }
];

export const getDemo = (id: string | null): Demo => {
    return DEMOS.find(d => d.id === id) || DEMOS[0];
}

export default DEMOS;
