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

const DUMMY_COMPANY_CONFIG = [
  {
    company_name: "Amplitude",
    company_url: "https://amplitude.com",
    company_logo: {
      logo: `<svg height="32" width="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.1034 7.20294C14.013 7.08739 13.9167 7.02368 13.8011 7.02368C13.7182 7.02961 13.6411 7.05627 13.57 7.10072C12.7152 7.76887 11.5523 10.6029 10.5952 14.3422L11.4441 14.3481C13.1152 14.3674 14.8426 14.3866 16.5463 14.4118C16.096 12.7022 15.6723 11.237 15.2811 10.0489C14.7078 8.32146 14.3226 7.54368 14.1034 7.20294Z" fill="currentColor"></path><path d="M16 0C7.16444 0 0 7.16444 0 16C0 24.8356 7.16444 32 16 32C24.8356 32 32 24.8356 32 16C32 7.16444 24.8356 0 16 0ZM27.8104 15.8074C27.7659 15.9867 27.6563 16.1615 27.5022 16.2889C27.483 16.3022 27.4637 16.3141 27.4444 16.3274L27.4252 16.3407L27.3867 16.3659L27.3541 16.3852C27.2326 16.4489 27.0963 16.4815 26.9555 16.4815H19.3733C19.4311 16.7319 19.5022 17.0207 19.5718 17.3304C19.9896 19.123 21.0889 23.8904 22.2637 23.8904H22.2889H22.3022H22.3274C23.24 23.8904 23.7096 22.5674 24.7378 19.6681L24.7511 19.6356C24.9185 19.1733 25.1052 18.6459 25.3037 18.0874L25.3555 17.9467C25.4326 17.76 25.6444 17.6637 25.8311 17.7407C25.9659 17.7926 26.0622 17.9274 26.0622 18.0756C26.0622 18.1141 26.0563 18.1467 26.0489 18.1778L26.0044 18.3185C25.8948 18.6652 25.7867 19.1348 25.6504 19.6815C25.04 22.2133 24.1141 26.037 21.7496 26.037H21.7304C20.2015 26.0237 19.2889 23.5822 18.8963 22.5348C18.1644 20.5807 17.6118 18.5052 17.0785 16.4889H10.1141L8.66815 21.1215L8.64889 21.1022C8.43111 21.443 7.97481 21.5452 7.63407 21.3274C7.42222 21.1926 7.29333 20.9615 7.29333 20.7111V20.6859L7.3837 20.1585C7.58222 18.9704 7.82666 17.7289 8.09629 16.483H5.14074L5.12741 16.4696C4.52296 16.3793 4.10518 15.8148 4.19555 15.2104C4.26667 14.7407 4.62667 14.3689 5.08889 14.2844C5.20444 14.2711 5.32 14.2652 5.43555 14.2711H5.57629C6.50815 14.2844 7.49778 14.3037 8.58963 14.3156C10.1259 8.06963 11.9052 4.89481 13.8844 4.88889C16.0044 4.88889 17.5793 9.71407 18.8385 14.437L18.8444 14.4563C21.4281 14.5081 24.1911 14.5852 26.8696 14.7778L26.9852 14.7911C27.0296 14.7911 27.0681 14.797 27.1141 14.8044H27.1274L27.1407 14.8104H27.1467C27.6044 14.9007 27.9067 15.3511 27.8104 15.8074Z" fill="currentColor"></path></svg>`,
      type: "svg",
    },
    summary:
      "Amplitude aims to centralize four core contract templates across multiple business entities and streamline a complex, multi-tier approval process. Their main challenges are inefficient version control, slow cycle times from timezone-spanning approvals, and a lack of real-time analytics about contract status and bottlenecks. SpotDraft proposed conditional, entity-specific workflows, automated reminders for approvals, and advanced analytics with dashboards for turnaround and bottleneck tracking. This would enhance process visibility, accelerate approvals, and allow proactive responses to delays.",
  },
  {
    company_name: "OpenAI",
    company_url: "https://openai.com",
    company_logo: {
      logo: "data:image/webp;base64,UklGRtIDAABXRUJQVlA4IMYDAABwFQCdASozADMAPjEOjEYiEREJgCADBLSAaqO2b4J92HsZ63/udoD/o19P/HH9yvUA3TX89/G78oNwB4rnx3+j/k9/Vf2K2B7+5fldzA1AD8i/3f7Y/o0/Xf8j5Nfkb/Sf3D4BP45/Kf7l/ZP28/wP/0+kD1H/sB7H/7AJlHqxNKEWK47Hvu0TyvwZJcf0W8LqXle5c8MBfuluJwj8fR2aQjuVFSUG7XkFbIe80XJ+TBF24IAA/v/+lCRMR5lDWZbYwyB2O/w771xsjC5VbNKHxTYfxiUTdFxczYZtM7107sciSt/6Y4P//BAtbTSLwnzF4VCLWQgGcf8GlmZTdhiDuypeCgBxs9u7d0//ShNpsV5FcABkfnUf8kgt9kwk5wv80Utv4avrtcKxXK/c/KxnJA3TmVa0xWWvrP8evNw2QdWvdc4AsARiMf4+S/FrBcMqZEKHXuPRfRvhDh46+Gz1FZpTZM2nPJWdLS1AtCtGzvlDKh9fs7qqDLdtcs9eQ6Vcvcogtstf0bLl6xHEK/+RXx1ly2IkWE94nu3b9CniU3jynkCgxJsOmL7nI6yGWQWsrW48KJNNIw3ipKr1dTSR4i5N4vcNdIboV+79vnjOyT5pjvJWT4xoiPtjkcdgB1DfxUYy838hhLr1CNFAF5KD9fui4Jfc6I9Nql520eJaY28auHh/bzSHFH37h0XDVytVTRjg+evysq4psxknQ7rgLc5vs2EGOAZnNdHCkGra3DBcglIWV//kKr/+RWKE4izg/pZlqDJfA4Ue77r6q/YrPlaT6KFu8Bc60tgJ9bOvR/AvT9ne2Qv/55sZmRjRMXLH3V0hrEbPMBuDA0zO2Na5LHDwVrGudH2miheg44jdxEmYlwowhjWqN0CcoXrafaf+eMQoD7NBzUpf/8S5bvMUV9vWD+8EQG+MO3cS3c//jrj5MuZ3lwL5Ho1Vafq7pXXPpdwwr8hO8PLl54Qd5Smn9LR62STlJnCWY/p7rkydOHetmuMaKzgeWA8YKKcyRkQhVwuTArq1QGS4lnUFuuKoLkBtW72Zg/HCnYh/sBDntEr/DeOf+YswvWhxZkPuyA5wfIKPXc6j8GkOoZUvZCYU347W3aCnct94ybd1KqUJMpFhaAaPGlKNGqYIs3T3tuc6TvUhDHGn0Vq78X4VHAxsNz9E821lymtZRydv/+AJMCmDcYr4EX0bFZbUTiMo/zjCeBdqWzkdd/1c93Ov2ziVmATLAEv+yPUWUm4j0Pf7m+iSKJ8CH0zDScqWe9S4bKi+PDMgAAA=",
      type: "image",
    },
    summary:
      "OpenAI requires an efficient and auditable process for collecting user consent to their standard Enterprise Service Agreement (ESA) and API Agreement, as well as streamlined onboarding acceptance of Privacy Policy and Terms of Use. Their goals include eliminating manual PDF compilation, supporting clickthrough acceptance with audit trails, enabling A/B testing of consent notices, and integrating consent records with Salesforce CRM. SpotDraft’s proposed workflow automates consent collection with clickthrough tracking, enables easy A/B testing of notice text, and pushes consent version data to Salesforce via webhooks—solving both operational efficiency and data integration needs.",
  },
  {
    company_name: "Nike",
    company_url: "https://nike.com",
    company_logo: {
      logo: `<svg aria-hidden="true" focusable="false" viewBox="0 0 32 32" role="img" width="32" height="32" fill="none"><path fill="currentColor" fill-rule="evenodd" d="M21 8.719L7.836 14.303C6.74 14.768 5.818 15 5.075 15c-.836 0-1.445-.295-1.819-.884-.485-.76-.273-1.982.559-3.272.494-.754 1.122-1.446 1.734-2.108-.144.234-1.415 2.349-.025 3.345.275.2.666.298 1.147.298.386 0 .829-.063 1.316-.19L21 8.719z" clip-rule="evenodd"></path></svg>`,
      type: "svg",
    },
    summary:
      "Nike's procurement team faces high volumes of third-party supplier contracts with labor-intensive, manual contract intake and screening. Key pain points include manual metadata entry, missed non-standard clause alerts, unreliable in-house scripts, lack of audit trails, and friction in redlining handoff. SpotDraft's solution offers instant metadata extraction—even from scanned PDFs—automated deviation alerts for non-standard terms, tamper-proof audit logging, and seamless transition to legal redlining with all metadata and version history preserved. This resolves process bottlenecks and supports compliance and audit needs.",
  },
];

const MAIL_DOMAIN = "yopmail.com";

export const getCustomerList = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return DUMMY_CUSTOMER_LIST.map((customer) => ({
    ...customer,
    company_url: DUMMY_COMPANY_CONFIG.find(
      (company) => company.company_name === customer.company_name
    )?.company_url,
    company_logo: DUMMY_COMPANY_CONFIG.find(
      (company) => company.company_name === customer.company_name
    )?.company_logo,
    mail_domain: MAIL_DOMAIN,
    summary: DUMMY_COMPANY_CONFIG.find(
      (company) => company.company_name === customer.company_name
    )?.summary,
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

export const CLICKTHROUGH_URL =
  "https://spotdraft-ai-signup-bridge.lovable.app/";

export const WORKSPACE_URL = "http://localhost:4200/home";
