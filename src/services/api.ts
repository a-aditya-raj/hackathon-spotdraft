import { Customer } from "../App";

const DUMMY_CUSTOMER_LIST: Customer[] = [
  {
    company_name: "Amplitude",
    pain_points: [
      "Lack of a single source of truth for MSAs across EMEA and APAC teams, leading to constant status update requests (00:05).",
      "Chaos due to each Business Unit having its own Word documents, different fields, and approval chains for Technology Partner Agreements, DPAs, and Order Forms (00:25).",
      "Slow approval cycles and added delays due to coordinating across multiple approval tiers (legal, finance, local business head, security) and time zones (00:50).",
      "Lack of real-time analytics and visibility into contract performance, preventing identification of bottlenecks and predictive alerts for approval lags (01:35, 02:15).",
    ],
    features: {
      verify_ai: {
        value: false,
        reason:
          "The client's primary needs are centered on standardizing internal templates, managing complex approval workflows, and gaining analytics for their own contracts, not on AI-driven analysis of incoming third-party contracts or deviation detection.",
      },
      tpp_workflow: {
        value: false,
        reason:
          "The client's needs revolve around standardizing and managing their own internal templates (MSAs, DPAs, Order Forms) and related approval workflows, not processing or screening third-party contracts.",
      },
      template_workflow: {
        value: true,
        reason:
          "Sarah explicitly states the need to standardize four core templates (MSAs, Technology Partner Agreements, DPAs, Order Forms) and manage different fields/approval chains for them across BUs (00:25), which directly aligns with template workflow functionality.",
      },
      clickwrap: {
        value: false,
        reason:
          "There is no mention from the client about needing a click-through mechanism for consent or terms acceptance.",
      },
      entity_management: {
        value: true,
        reason:
          "Sarah highlights issues with managing contracts across multiple entities/regions (EMEA and APAC, 00:05) and needing entity-specific rules for approvals (00:50). Punit also mentions SpotDraft's ability to set 'entity-specific rules' for workflows (01:10).",
      },
      branding: {
        value: true,
        reason:
          "All clients are assumed to need branding for their CLM software.",
      },
    },
  },
  {
    company_name: "Nike",
    pain_points: [
      "Manual data entry and compilation of metadata from a high volume of 50+ monthly supplier contracts (MOUs, sourcing agreements), leading to legal being 'buried in PDFs' (00:05).",
      "Painfully slow contract screening and review process, causing missed deadlines and the business chasing delivery timelines (00:30).",
      "Inability to immediately flag non-standard clauses (e.g., indemnity caps, IP clauses) in supplier contracts, requiring manual review and escalation (01:10).",
      "Existing home-grown script for contract screening is unreliable (breaks on scanned PDFs) and lacks a proper audit trail, posing compliance risks (01:40).",
      "Friction in handing off contracts from screening to legal for redlines, often involving re-uploading or losing extracted metadata (02:15).",
    ],
    features: {
      verify_ai: {
        value: true,
        reason:
          "Emily explicitly needs automated metadata extraction from uploaded PDFs (00:50) and immediate flagging of non-standard clauses (01:10), which SpotDraft addresses with 'deviation alerts' (01:25). This aligns with AI-driven analysis of incoming contracts.",
      },
      tpp_workflow: {
        value: true,
        reason:
          "Nike's core challenge is efficiently processing a high volume of *supplier contracts* (third-party paper), which involves screening, auto-extraction, deviation alerts, and a smooth hand-off for redlining (00:05, 00:30, 01:10, 02:15).",
      },
      template_workflow: {
        value: false,
        reason:
          "The client's focus is on processing incoming third-party supplier contracts and ensuring compliance, not on creating or managing their own internal templates for outward use or internal standardization.",
      },
      clickwrap: {
        value: false,
        reason:
          "There is no mention from the client about needing a click-through mechanism for consent or terms acceptance.",
      },
      entity_management: {
        value: false,
        reason:
          "While Nike operates globally, their specific pain points are centered on high-volume processing of supplier contracts for global procurement, without explicit mention of needing entity-specific workflows or managing contracts across distinct legal entities with varied rules.",
      },
      branding: {
        value: true,
        reason:
          "All clients are assumed to need branding for their CLM software.",
      },
    },
  },
  {
    company_name: "OpenAI",
    pain_points: [
      "Manual and messy process for collecting consent for Enterprise Service Agreements (ESA) and API Agreements at scale, involving legal team manually compiling PDFs (00:05).",
      "Lack of automated and trackable consent collection for Privacy Policy and Terms of Use, especially during user onboarding (00:30).",
      "Inability to A/B test different phrasings in privacy notices to optimize consent rates (01:00).",
      "Lack of integration and visibility into consent versioning in their CRM (Salesforce), making it difficult to tag user records with accepted terms (01:30).",
    ],
    features: {
      verify_ai: {
        value: false,
        reason:
          "The client's needs are focused on streamlining and tracking consent for their own standard legal terms, not on AI-driven analysis of incoming contracts or deviation detection.",
      },
      tpp_workflow: {
        value: false,
        reason:
          "The client is focused on managing and distributing their own standard Enterprise Service Agreements (ESAs), API Agreements, and privacy policies/terms of use for user consent, not processing or screening third-party contracts.",
      },
      template_workflow: {
        value: true,
        reason:
          "Lisa confirms their ESA and API agreements are 'fixed templates' and 'standard across all users' that just need to be reviewed and accepted (00:25, 00:30), aligning with the 'Basic Template Workflow' for publishing and managing these standard agreements (00:45).",
      },
      clickwrap: {
        value: true,
        reason:
          "Lisa explicitly requests the Privacy Policy and Terms of Use to be presented 'via a clickthrough mechanism—ideally during onboarding' (00:30), which is directly addressed by SpotDraft's 'Clickthrough Packet' (00:45).",
      },
      entity_management: {
        value: false,
        reason:
          "The client's pain points revolve around scaling consent collection for standard terms to a large user base and integrating with CRM, but there's no mention of managing these agreements across distinct legal entities or regions with varying requirements.",
      },
      branding: {
        value: true,
        reason:
          "All clients are assumed to need branding for their CLM software.",
      },
    },
  },
];

const DUMMY_COMPANY_URL_LIST = [
  {
    company_name: "Amplitude",
    company_url: "https://amplitude.com",
  },
  {
    company_name: "OpenAI",
    company_url: "https://openai.com",
  },
  {
    company_name: "Nike",
    company_url: "https://nike.com",
  },
];

const MAIL_DOMAIN = "yopmail.com";

export const getCustomerList = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return DUMMY_CUSTOMER_LIST.map((customer) => ({
    ...customer,
    company_url: DUMMY_COMPANY_URL_LIST.find(
      (company) => company.company_name === customer.company_name
    )?.company_url,
    mail_domain: MAIL_DOMAIN,
  }));
};

export const loginAsUser = async (email: string, password: string) => {
  await new Promise((resolve) =>
    setTimeout(() => {
      resolve(password);
      localStorage.setItem(
        "user",
        JSON.stringify({
          email,
          name: email.split("@")[0],
        })
      );
    }, 1000)
  );
  return {
    hasError: false,
    user: {
      email,
      name: email.split("@")[0],
    },
  };
};

export const signOut = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  localStorage.removeItem("user");
  return {
    hasError: false,
  };
};

export const checkSession = async () => {
  await new Promise((resolve) =>
    setTimeout(() => {
      const user = localStorage.getItem("user");
      resolve(user ? true : false);
    }, 1000)
  );
  return {
    hasError: false,
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : null,
  };
};
