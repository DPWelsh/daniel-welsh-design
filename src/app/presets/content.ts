/* ── /presets, Field Guide № 005 ─────────────────────────────────────
   Turning a look you like into (a) a brand palette and (b) a Lightroom
   preset, using Claude at each step.

   DESIGN NOTE, important: this deliberately does NOT ask Claude to write
   an .xmp preset from scratch. Lightroom's develop settings live in the
   crs: namespace and the attribute names shift between versions, so a
   generated-from-nothing file is a coin flip that fails silently, the
   preset imports and does nothing. Instead the flow exports a known-good
   preset out of Lightroom first and has Claude EDIT it. Same reason you
   copy a working config before changing it. Keep that ordering if you
   revise this page. */

export const LEDE =
  "You have a photo, or a set of them, with a look you want. This turns that look into two things you can actually use: a brand palette with real hex values, and a Lightroom preset that applies the grade to anything you shoot next.";

export const WHY =
  "Most brand kits start from a colour picker and a guess. Starting from photography instead gives you a palette that already works in the real world, because it came from light that actually existed. It also means the site, the reels and the photos agree with each other without anyone maintaining a rulebook.";

export type Stage = {
  n: string;
  title: string;
  time: string;
  what: string;
  steps: string[];
  copy?: { id: string; filename: string; body: string };
  note?: string;
  done: string;
};

export const STAGES: Stage[] = [
  {
    n: "01",
    title: "Pick the images",
    time: "5 min",
    what: "Between three and eight images that share the look you are chasing. They do not have to be yours, and at this stage they do not have to be good, they have to be consistent.",
    steps: [
      "Choose images where the light and colour agree with each other. One outlier will pull the whole palette off.",
      "Include at least one with skin tone in it if people will ever appear in your photography. Skin is what breaks a grade.",
      "Put them in one folder. Full resolution, not screenshots of them.",
    ],
    note: "If you are pulling from someone else's photography for reference, that is fine for deriving a palette and a grade. Do not publish their images.",
    done: "One folder, three to eight images, one coherent look.",
  },
  {
    n: "02",
    title: "Get the palette out",
    time: "10 min",
    what: "Drag the images into Claude and have it read the colour out of them. Not a mood description, actual hex values with a job attached to each.",
    steps: [
      "Attach every image in the folder to one message.",
      "Paste the prompt below.",
      "Check the result against the images yourself. If a colour looks wrong, say which image it should have come from.",
    ],
    copy: {
      id: "palette",
      filename: "01-palette-prompt.txt",
      body: `I have attached <N> images that share a look I want to build a brand
around. Read the colour out of them.

Give me:
1. A palette of 4 to 6 colours as hex, and for each one:
   - which image it came from
   - what it is doing in that image (dominant, background, accent,
     shadow, skin)
   - the job it should do in a brand: text, background, accent, or
     supporting
2. The two colours with the strongest contrast against each other, with
   their contrast ratio, so I know my text-on-background pair.
3. Any colour that appears in every image. That one is the brand colour
   whether I like it or not.

Rules:
- Sample the actual pixels. Do not describe a mood and work backwards.
- Give me real hex values, not colour names.
- If the images disagree with each other, say so and tell me which one
  is the outlier rather than averaging them into mud.`,
    },
    done: "4 to 6 hex values, each with a stated job, and a text-on-background pair you can read.",
  },
  {
    n: "03",
    title: "Describe the grade in words",
    time: "10 min",
    what: "Before touching Lightroom, get the look written down as adjustments. This is the step that makes the preset reproducible instead of a lucky slider drag.",
    steps: [
      "Same images, new message.",
      "Paste the prompt below.",
      "Keep the output. It is the spec you will hand to the preset step, and the thing you check the result against.",
    ],
    copy: {
      id: "grade",
      filename: "02-grade-prompt.txt",
      body: `Same images. Describe the colour grade as editing adjustments, in the
language Lightroom uses.

Cover:
- White balance: is it warm or cool, and roughly how far
- Exposure and contrast: flat or punchy, lifted or crushed
- Highlights, shadows, whites, blacks: which are pulled and which way
- Where colour sits in the shadows vs the highlights (colour grading)
- Which individual hues are pushed, pulled or desaturated
- Whether the blacks are lifted, and how much
- Grain and clarity, if either is obvious

For each one, give me a direction and a rough strength (slight, moderate,
strong), not a number, numbers come later against a real preset file.

Finish with two or three sentences describing the look in plain English,
the way I would explain it to a photographer.

If the images do not share a single coherent grade, say so.`,
    },
    done: "A written spec of the look, adjustment by adjustment.",
  },
  {
    n: "04",
    title: "Export one preset out of Lightroom first",
    time: "5 min",
    what: "This is the step people skip, and it is the one that makes the rest work. You need a known-good preset file to edit, rather than asking for one to be invented.",
    steps: [
      "In Lightroom, open any photo and move a couple of sliders. Anything.",
      "Create a preset from it: Develop → Presets → the + button → Create Preset. Tick every group so the file contains all the fields.",
      "Right-click the preset in the list → Export, and save the .xmp somewhere you can find.",
      "Open it in a text editor to confirm it is readable XML.",
    ],
    note: "Why bother: Lightroom stores develop settings as XML attributes whose names change between versions. A preset written from scratch usually imports fine and then does nothing, which is the worst kind of failure because it looks like it worked. Editing a real file removes the guesswork entirely.",
    done: "A .xmp file on your desktop that Lightroom itself produced.",
  },
  {
    n: "05",
    title: "Have Claude edit the preset",
    time: "15 min",
    what: "Give it the known-good file, the images, and the spec from stage 03, and ask for the same file back with the values changed.",
    steps: [
      "Attach the .xmp, the images, and paste the spec from stage 03.",
      "Paste the prompt below.",
      "Save the result as a new .xmp with a sensible name.",
    ],
    copy: {
      id: "preset",
      filename: "03-preset-prompt.txt",
      body: `Attached: a Lightroom preset exported from my own Lightroom (.xmp), the
reference images, and the grade spec you wrote earlier.

Edit that .xmp so it produces the look in the images.

Rules, all of them matter:
- Keep the file structure, namespaces and attribute names EXACTLY as
  they are. Change values only. Do not add attributes that were not
  already in the file, and do not remove any.
- If an adjustment in the spec has no matching attribute in the file,
  tell me rather than inventing one.
- Rename the preset itself inside the file to: <your preset name>
- Stay conservative. A preset that is 70% of the look and holds up
  across different photos beats one that nails a single image.
- Do not touch exposure much. Exposure belongs to the individual photo,
  not the preset.

Then give me, separately from the file:
- a plain-English summary of what you changed and why
- the two or three sliders I should expect to nudge per photo`,
    },
    done: "A new .xmp file, same structure as the one Lightroom made, different values.",
  },
  {
    n: "06",
    title: "Install and check it",
    time: "10 min",
    what: "Import it, apply it to photos it has never seen, and judge it on the ones it looks worst on.",
    steps: [
      "Lightroom → Develop → Presets panel → the + button → Import Presets, and pick your file.",
      "Apply it to three photos: one from the reference set, one shot in different light, and one with a person in it.",
      "The third one is the real test. Grades that ruin skin tone are the most common failure.",
    ],
    note: "If it does nothing at all after importing, the file structure was altered rather than just the values. Go back to the exported original and try again, changing fewer things.",
    done: "It looks right on a photo that was not in the reference set.",
  },
  {
    n: "07",
    title: "Iterate with screenshots",
    time: "as long as it takes",
    what: "The loop that actually gets it there. Claude cannot see your Lightroom, so show it.",
    steps: [
      "Screenshot the before and after, side by side, in Lightroom.",
      "Paste both back with the prompt below.",
      "Two or three rounds is normal. More than that means the reference set was inconsistent, go back to stage 01.",
    ],
    copy: {
      id: "iterate",
      filename: "04-iterate-prompt.txt",
      body: `Here is my photo before and after the preset you wrote, plus the
original reference image I am trying to match.

Tell me specifically what is different between my result and the
reference. Then give me the edited .xmp again with those differences
corrected.

Be concrete: name the adjustment and the direction. "The shadows are too
green, pull the shadow tint toward magenta", not "warm it up a bit".

If the gap is something a preset structurally cannot fix, say so and
tell me what it would need instead: a profile, a mask, or a different
shot.`,
    },
    done: "A preset you would use on a client shoot without thinking about it.",
  },
];

export const BRAND_TIE =
  "The palette from stage 02 goes straight into the brand kit step of a build, and the preset keeps every photo you shoot afterwards agreeing with it. That is the point of doing them together: one look, applied to the site and to the photography, without anyone maintaining a rulebook.";

export const NOT_COVERED = [
  "Camera profiles. Presets sit on top of a profile, and if the profile is wrong no preset saves it.",
  "Masking and local adjustments. Those are per photo by definition and do not belong in a preset.",
  "Video LUTs. Related idea, different file format, different workflow.",
];

export const CLOSING =
  "The whole trick is stage 04. Export a preset Lightroom made, and edit that. Everything that goes wrong with generated presets goes wrong because someone asked for a file format to be invented rather than modified.";
