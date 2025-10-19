import { GoogleGenAI, Type } from "@google/genai";
import type { MVPPlan, LandingPageContent } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const mvpPlanSchema = {
  type: Type.OBJECT,
  properties: {
    projectName: {
      type: Type.STRING,
      description: "A catchy and relevant name for the project."
    },
    summary: {
      type: Type.STRING,
      description: "A brief, one-paragraph summary of the business idea and the problem it solves."
    },
    coreFeatures: {
      type: Type.ARRAY,
      description: "A list of 3-5 essential features for the Minimum Viable Product.",
      items: { type: Type.STRING }
    },
    userPersonas: {
      type: Type.ARRAY,
      description: "A list of 2-3 target user personas, with a brief description for each.",
      items: { type: Type.STRING }
    },
    techStack: {
      type: Type.OBJECT,
      description: "A suggested technology stack for the MVP.",
      properties: {
        frontend: { type: Type.STRING, description: "e.g., React, Vue, Svelte" },
        backend: { type: Type.STRING, description: "e.g., Node.js (Express), Python (Django), Go" },
        database: { type: Type.STRING, description: "e.g., PostgreSQL, MongoDB, Firebase" }
      },
      required: ["frontend", "backend", "database"]
    },
    userStories: {
      type: Type.ARRAY,
      description: "A list of key user stories in the format 'As a [persona], I want [goal] so that [benefit]'.",
      items: { type: Type.STRING }
    },
    monetizationStrategies: {
      type: Type.ARRAY,
      description: "A list of potential monetization strategies for the business.",
      items: { type: Type.STRING }
    },
    successMetrics: {
      type: Type.ARRAY,
      description: "A list of key performance indicators (KPIs) to measure the success of the MVP.",
      items: { type: Type.STRING }
    }
  },
  required: ["projectName", "summary", "coreFeatures", "userPersonas", "techStack", "userStories", "monetizationStrategies", "successMetrics"]
};

const landingPageSchema = {
    type: Type.OBJECT,
    properties: {
        headline: { type: Type.STRING, description: "A powerful, attention-grabbing headline for the landing page hero section." },
        subheading: { type: Type.STRING, description: "A concise, benefit-driven subheading that elaborates on the headline." },
        ctaButton: { type: Type.STRING, description: "Compelling text for the main call-to-action button, e.g., 'Get Early Access'." },
        features: {
            type: Type.ARRAY,
            description: "A list of exactly 3 key features or benefits to highlight on the landing page.",
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING, description: "The title of the feature." },
                    description: { type: Type.STRING, description: "A short, engaging description of the feature's benefit to the user." },
                    icon: { 
                        type: Type.STRING, 
                        description: "A relevant icon name from the following list: 'zap', 'shield-check', 'users', 'globe', 'trending-up', 'star'.",
                        enum: ['zap', 'shield-check', 'users', 'globe', 'trending-up', 'star']
                    }
                },
                required: ["title", "description", "icon"]
            }
        }
    },
    required: ["headline", "subheading", "ctaButton", "features"]
};


export const generateMVPPlan = async (idea: string): Promise<MVPPlan> => {
  const prompt = `
    Analyze the following business idea and generate a comprehensive MVP (Minimum Viable Product) plan. 
    The plan should be clear, concise, and actionable for a working professional looking to start this project.
    
    Business Idea: "${idea}"

    Provide a detailed breakdown covering all the fields in the requested JSON schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: mvpPlanSchema,
        temperature: 0.7,
      },
    });

    const jsonText = response.text.trim();
    const parsedPlan: MVPPlan = JSON.parse(jsonText);
    return parsedPlan;

  } catch (error) {
    console.error("Error generating content from Gemini:", error);
    throw new Error("Failed to generate MVP plan from Gemini API.");
  }
};

export const generateLandingPageContent = async (idea: string, mvpPlan: MVPPlan): Promise<LandingPageContent> => {
    const prompt = `
      Based on the following business idea and its corresponding MVP plan, generate compelling marketing copy for a promotional landing page.
      The tone should be exciting, professional, and persuasive, aimed at attracting early users.

      Business Idea: "${idea}"

      MVP Plan:
      - Project Name: ${mvpPlan.projectName}
      - Summary: ${mvpPlan.summary}
      - Core Features: ${mvpPlan.coreFeatures.join(', ')}
      - Target Audience: ${mvpPlan.userPersonas.join(', ')}

      Generate the content according to the provided JSON schema. Ensure the features you create are directly inspired by the MVP's core features.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: landingPageSchema,
                temperature: 0.8,
            },
        });
        
        const jsonText = response.text.trim();
        const parsedContent: LandingPageContent = JSON.parse(jsonText);
        return parsedContent;

    } catch (error) {
        console.error("Error generating landing page content from Gemini:", error);
        throw new Error("Failed to generate landing page content from Gemini API.");
    }
};
