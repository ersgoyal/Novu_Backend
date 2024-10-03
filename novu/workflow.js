const { workflow } = require("@novu/framework");
const { z } = require("zod");

const testWorkflow = workflow(
  "test-workflow",
  async ({ step, payload }) => {
    await step.email(
      "send-email",
      async (controls) => {
        return {
          subject: payload.subject || controls.subject,
          body: payload.body || controls.body,
        };
      },
      {
        controlSchema: z.object({
          subject: z.string().default("Default Subject"),
          body: z.string().default("This is a default body message."),
        }),
      }
    );
  },
  {
    payloadSchema: z.object({
      userName: z.string().default("John Doe"),
      subject: z.string().optional(),
      body: z.string().optional(),
    }),
  }
);

module.exports = { testWorkflow };
