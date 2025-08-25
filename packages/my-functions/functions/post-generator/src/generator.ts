import OpenAI from "openai";
import { IStrategy } from "./strategy";
import { ResponseCreateParamsBase } from "openai/resources/responses/responses";

export interface GeneratedContent {
  contents: unknown[];
  featuredImageBase64?: string;
  featuredImagePrompt?: string;
}

export class OpenAIBlogGenerator {
  private readonly openAIClient: OpenAI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  private readonly openAIModel: string = "gpt-4.5-preview-2025-02-27";

  async generate({
    strategy,
  }: {
    strategy: IStrategy;
  }): Promise<GeneratedContent> {
    let response = null;
    const contents: unknown[] = [];

    // Generate featured image
    const { featuredImageBase64, featuredImagePrompt } =
      await this.generateFeaturedImage({ strategy });

    // Generate content
    response = await this.generateIntroduction({ strategy });
    if (response) {
      const blogPost = JSON.parse(response.output_text);
      contents.push(...blogPost.content);
    }

    for (let i = 0; i < strategy.getNumberOfParagraphs(); i++) {
      response = await this.generateParagraph({
        index: i,
        strategy,
        previousResponseId: response?.id || "",
      });
      if (response) {
        const blogPost = JSON.parse(response.output_text);
        contents.push(...blogPost.content);
      }
    }

    response = await this.generateConclusion({
      strategy,
      previousResponseId: response?.id || "",
    });
    if (response) {
      const blogPost = JSON.parse(response.output_text);
      contents.push(...blogPost.content);
    }

    return { contents, featuredImageBase64, featuredImagePrompt };
  }

  private async generateFeaturedImage({ strategy }: { strategy: IStrategy }) {
    try {
      // const response = await this.openAIClient.images.generate({
      //   model: "gpt-image-1",
      //   prompt: strategy.getFeaturedImagePrompt(),
      //   n: 1,
      //   size: "1536x1024",
      //   output_format: "webp",
      //   quality: "medium",
      // });

      // return response.data?.[0].b64_json;
      return {
        featuredImageBase64: undefined,
        featuredImagePrompt: strategy.getFeaturedImagePrompt(),
      };
    } catch (error) {
      console.error("Error generating featured image:", error);
      return {
        featuredImageBase64: undefined,
        featuredImagePrompt: strategy.getFeaturedImagePrompt(),
      };
    }
  }

  private generateIntroduction({ strategy }: { strategy: IStrategy }) {
    return this.openAIClient.responses.create({
      model: this.openAIModel,
      store: true,
      input: [
        {
          role: "system",
          content:
            "Generate a structured blog post compatible with the Tiptap Rich Text Editor schema in JSON format.",
        },
        {
          role: "user",
          content: strategy.getIntroductionPrompt(),
        },
      ],
      ...this.getJSONSchema(),
    });
  }

  private generateParagraph({
    index,
    strategy,
    previousResponseId,
  }: {
    index: number;
    strategy: IStrategy;
    previousResponseId: string;
  }) {
    return this.openAIClient.responses.create({
      model: this.openAIModel,
      store: true,
      previous_response_id: previousResponseId,
      input: [
        {
          role: "user",
          content: strategy.getParagraphPrompt(index),
        },
      ],
      ...this.getJSONSchema(),
    });
  }

  private generateConclusion({
    strategy,
    previousResponseId,
  }: {
    strategy: IStrategy;
    previousResponseId: string;
  }) {
    return this.openAIClient.responses.create({
      model: this.openAIModel,
      store: true,
      previous_response_id: previousResponseId,
      input: [
        {
          role: "user",
          content: strategy.getConclusionPrompt(),
        },
      ],
      ...this.getJSONSchema(),
    });
  }

  private getJSONSchema = (): {
    text: ResponseCreateParamsBase["text"];
  } => {
    return {
      text: {
        format: {
          type: "json_schema",
          name: "tiptap_document",
          schema: {
            type: "object",
            properties: {
              type: {
                type: "string",
                enum: ["doc"],
                description: "Root document type, must be 'doc'",
              },
              content: {
                type: "array",
                description: "Array of block-level nodes",
                items: {
                  type: "object",
                  properties: {
                    type: {
                      type: "string",
                      description: "Type of the block node",
                      enum: [
                        "paragraph",
                        "heading",
                        "figure",
                        "bulletList",
                        "listItem",
                        "codeBlock",
                      ],
                    },
                    attrs: {
                      type: "object",
                      description:
                        "Attributes specific to the node type (e.g., level for heading, src/alt/title for figure, language for codeBlock)",
                      properties: {
                        level: {
                          type: "integer",
                          description: "Heading level (1-6)",
                        },
                        src: {
                          type: "string",
                          description: "Image source URL for figure node",
                        },
                        alt: {
                          type: "string",
                          description: "Alternative text for figure image",
                        },
                        title: {
                          type: "string",
                          description: "Title or caption for figure image",
                        },
                        language: {
                          type: "string",
                          description:
                            "Language identifier for codeBlock (e.g., 'javascript', 'python')",
                        },
                      },
                      required: ["level", "src", "alt", "title", "language"],
                      additionalProperties: false,
                    },
                    content: {
                      type: "array",
                      description:
                        "Child nodes (e.g., listItems in bulletList) or inline content (text nodes with marks)",
                      items: {
                        type: "object",
                        properties: {
                          type: {
                            type: "string",
                            description:
                              "Type of the content item (e.g., 'text', 'paragraph', 'listItem')",
                          },
                          text: {
                            type: "string",
                            description:
                              "Text content (only for 'text' type nodes)",
                          },
                          marks: {
                            type: "array",
                            description:
                              "Formatting marks applied to 'text' nodes (e.g., bold, code, link)",
                            items: {
                              type: "object",
                              properties: {
                                type: {
                                  type: "string",
                                  description: "Type of the mark",
                                  enum: ["bold", "code", "link"],
                                },
                                attrs: {
                                  type: "object",
                                  description:
                                    "Attributes for the mark (required for 'link')",
                                  properties: {
                                    href: {
                                      type: "string",
                                      description: "URL for the link mark",
                                    },
                                    target: {
                                      type: "string",
                                      enum: ["_blank"],
                                      description:
                                        "Target attribute for link (usually '_blank')",
                                    },
                                    rel: {
                                      type: "string",
                                      description:
                                        "Rel attribute for link (e.g., 'noopener noreferrer nofollow')",
                                    },
                                    class: {
                                      type: "string",
                                      description:
                                        "Optional CSS class for the link",
                                    },
                                  },
                                  required: ["href", "target", "rel", "class"],
                                  additionalProperties: false,
                                },
                              },
                              required: ["type", "attrs"],
                              additionalProperties: false,
                            },
                          },
                          content: {
                            type: "array",
                            description: "Content for nested block nodes",
                            items: {
                              type: "object",
                              additionalProperties: false,
                            },
                          },
                        },
                        required: ["type", "text", "marks"],
                        additionalProperties: false,
                      },
                    },
                  },
                  required: ["type", "attrs", "content"],
                  additionalProperties: false,
                },
              },
            },
            required: ["type", "content"],
            additionalProperties: false,
          },
        },
      },
    };
  };
}
