import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

// Strict email schema: RFC-ish, length-bounded, trimmed/lowercased.
const waitlistSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(3, "Email is too short")
    .max(254, "Email is too long")
    .email("Enter a valid email")
    // No control chars, no whitespace inside.
    .regex(/^[^\s<>"'`\\]+$/, "Invalid characters in email"),
  source: z.string().trim().max(64).optional(),
});

export const joinWaitlist = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => waitlistSchema.parse(input))
  .handler(async ({ data }) => {
    try {
      // Capture UA server-side (never trust client to send it).
      const userAgent = (getRequestHeader("user-agent") ?? "").slice(0, 512);

      const { error } = await supabaseAdmin.from("waitlist").insert({
        email: data.email,
        source: data.source ?? "landing_cta",
        user_agent: userAgent || null,
      });

      if (error) {
        // Unique violation → already on the list. Treat as success (no enumeration leak).
        if (error.code === "23505") {
          return { ok: true as const, alreadyJoined: true };
        }
        console.error("[waitlist] insert failed", error);
        return { ok: false as const, error: "Could not save your request. Try again shortly." };
      }

      return { ok: true as const, alreadyJoined: false };
    } catch (err) {
      console.error("[waitlist] unexpected", err);
      return { ok: false as const, error: "Something went wrong." };
    }
  });
