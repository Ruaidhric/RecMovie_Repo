import z from "zod";

export const preferencesSchema = z
    .object({
        moodOption: z.enum(["choose", "describe"]),
        selectedMood: z.string().optional(),
        customMood: z.string().optional(),
        freeTime: z.string(),
        language: z.string(),
        country: z.string(),
        era: z.string(),
        popularity: z.string(),
        genres: z
            .array(z.string())
            .min(1, "Select at least one genre."),
        movieCount: z.coerce
            .number()
            .int()
            .min(1, "At least 1 movie.")
            .max(20, "Maximum 20 movies."),
    })
    .superRefine((data, ctx) => {
        if (data.moodOption === "choose") {
            if (!data.selectedMood || data.selectedMood.trim() === "") {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ["selectedMood"],
                    message: "Select a mood or switch to describe it yourself.",
                });
            }
        } else {
            if (!data.customMood || data.customMood.trim() === "") {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ["customMood"],
                    message: "Describe your mood or switch to choose from options.",
                });
            }
        }
    });

export type PreferencesFormData = z.infer<typeof preferencesSchema>;

export type PreferencesErrors = Partial<
    Record<keyof PreferencesFormData, string>
>;