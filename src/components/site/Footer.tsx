import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Loader2, CheckCircle2, Phone, Mail, MapPin } from "lucide-react";
import { submitLead } from "@/lib/leads.functions";
import { leadSchema, SERVICE_CATEGORIES } from "@/lib/validators";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Heading } from "./Heading";
import { SectionHeading } from "./SectionHeading";
import type { ReactNode } from "react";

const WA_AREAS = ["Vancouver", "Camas", "Battle Ground", "Ridgefield", "Washougal"];
const OR_AREAS = [
  "Portland",
  "Beaverton",
  "Hillsboro",
  "Tigard",
  "Lake Oswego",
  "Sherwood",
  "Gresham",
  "Happy Valley",
  "Wilsonville",
];

const SERVICE_LINKS = [
  { label: "Remodeling", href: "#services" },
  { label: "Handyman", href: "#services" },
  { label: "MEP Services", href: "#services" },
  { label: "Exterior Structures", href: "#services" },
];

const COMPANY_LINKS = [
  { label: "About Us", href: "#about" },
  { label: "How It Works", href: "#process" },
  { label: "Client Reviews", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

const darkFieldClass =
  "h-12 rounded-none border-transparent bg-white px-4 text-base text-black placeholder:text-neutral-500 focus-visible:ring-brand-yellow md:text-base";

export function Footer() {
  const submit = useServerFn(submitLead);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    project_description: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    const parsed = leadSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const iss of parsed.error.issues) {
        fieldErrors[iss.path.join(".")] = iss.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setLoading(true);
    try {
      await submit({ data: parsed.data });
      setDone(true);
      setValues({ name: "", phone: "", email: "", project_description: "" });
      toast.success("Request received — we'll be in touch shortly.");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please call (564) 888-0755.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <footer id="contact" className="w-full bg-brand-charcoal text-brand-charcoal-foreground">
      {/* CTA banner — headline + full lead form, diagonal photo bleed */}
      <div className="relative overflow-hidden border-b-4 border-brand-yellow">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/2 bg-[url('/images/form-hero.webp')] bg-cover bg-center [clip-path:polygon(0%_0%,42%_0%,78%_100%,0%_100%)] lg:block"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-brand-charcoal via-brand-charcoal/95 to-brand-charcoal/50 lg:to-brand-charcoal/30" />

        <div className="relative z-10 w-full px-4 py-20 sm:px-8 lg:px-16">
          <div className="lg:ml-auto lg:w-1/2 lg:pl-8">
            <SectionHeading
              eyebrow="free estimate."
              title="Ready To Start Your Project?"
              description="Fill out the form below and we'll get back to you within one business day with a free estimate."
              align="left-lg"
              tone="dark"
              size="md"
            />

            <div className="max-w-2xl">
              {done ? (
                <div className="flex items-start gap-3 border border-brand-yellow bg-brand-yellow/10 p-6">
                  <CheckCircle2 className="h-6 w-6 flex-none text-brand-charcoal" />
                  <div>
                    <Heading as="div" size="md" uppercase={false}>
                      Request received.
                    </Heading>
                    <p className="mt-1 text-lg text-neutral-700">
                      Our team will contact you within one business day. For urgent requests, call{" "}
                      <a href="tel:+15648880755" className="font-bold underline">
                        (564) 888-0755
                      </a>
                      .
                    </p>
                    <button
                      onClick={() => setDone(false)}
                      className="mt-4 text-xs font-bold uppercase tracking-wide text-brand-charcoal underline"
                    >
                      Submit another request
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
                  <FooterField label="Full name" error={errors.name} className="sm:col-span-2">
                    <Input
                      value={values.name}
                      onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
                      placeholder="Jane Doe"
                      autoComplete="name"
                      required
                      className={darkFieldClass}
                    />
                  </FooterField>
                  <FooterField label="Phone" error={errors.phone}>
                    <Input
                      value={values.phone}
                      onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
                      placeholder="(555) 555-5555"
                      inputMode="tel"
                      autoComplete="tel"
                      required
                      className={darkFieldClass}
                    />
                  </FooterField>
                  <FooterField label="Email" error={errors.email}>
                    <Input
                      type="email"
                      value={values.email}
                      onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                      className={darkFieldClass}
                    />
                  </FooterField>
                  <FooterField
                    label="Project type"
                    error={errors.project_description}
                    className="sm:col-span-2"
                  >
                    <Select
                      value={values.project_description}
                      onValueChange={(val) =>
                        setValues((v) => ({ ...v, project_description: val }))
                      }
                    >
                      <SelectTrigger className={darkFieldClass}>
                        <SelectValue placeholder="Select a service category" />
                      </SelectTrigger>
                      <SelectContent>
                        {SERVICE_CATEGORIES.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FooterField>

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-2 inline-flex items-center justify-center gap-2 bg-brand-yellow px-6 py-4 text-base font-black uppercase tracking-wide text-brand-charcoal transition hover:brightness-95 disabled:opacity-70 sm:col-span-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                      </>
                    ) : (
                      "Submit Request"
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Info strip */}
      <div className="border-b border-white/10">
        <div className="grid divide-y divide-white/10 px-4 py-8 sm:px-8 sm:grid-cols-3 sm:divide-y-0 sm:divide-x lg:px-16">
          <InfoItem icon={Phone} label="Call Us" value="(564) 888-0755" href="tel:+15648880755" />
          <InfoItem
            icon={Mail}
            label="Need Support"
            value="help@kamalmighty.com"
            href="mailto:help@kamalmighty.com"
          />
          <InfoItem
            icon={MapPin}
            label="Head Office"
            value={
              <>
                6168 NE Highway 99, Ste 201
                <br />
                Vancouver, WA 98665
              </>
            }
          />
        </div>
      </div>

      {/* Footer columns */}
      <div className="w-full px-4 py-16 sm:px-8 lg:px-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <img
              src="/images/logo.webp"
              alt="KAM Almighty Property Services"
              width={872}
              height={368}
              className="h-16 w-auto object-contain"
            />
            <p className="mt-6 max-w-md text-lg leading-relaxed text-neutral-200">
              Licensed General Contractor serving Southwest Washington and the Portland metro.
              Residential and commercial remodeling, repairs, and maintenance.
            </p>
          </div>

          <FooterColumn title="Services" links={SERVICE_LINKS} />
          <FooterColumn title="Company" links={COMPANY_LINKS} />

          <div>
            <Heading as="h4" size="xs" tone="accent" tracking="widest">
              Service Area
            </Heading>
            <div className="mt-4 space-y-3 text-lg leading-relaxed text-neutral-200">
              <div>
                <span className="font-semibold text-white">Washington: </span>
                {WA_AREAS.join(", ")}
              </div>
              <div>
                <span className="font-semibold text-white">Oregon: </span>
                {OR_AREAS.join(", ")}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-base text-neutral-300 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>© 2026 KAM ALMIGHTY PROPERTY SERVICES LLC · General Contractor</span>
            <a href="/privacy-policy" className="hover:text-brand-yellow">
              Privacy Policy
            </a>
            <a href="/terms-of-use" className="hover:text-brand-yellow">
              Terms of Use
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>Mon – Sat: 7:00am – 7:00pm</span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-yellow" />
              Licensed · Bonded · Insured
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterField({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`grid gap-1.5 ${className ?? ""}`}>
      <Label className="text-xs font-bold uppercase tracking-wide text-neutral-200">{label}</Label>
      {children}
      {error && <span className="text-xs font-medium text-red-400">{error}</span>}
    </div>
  );
}

function InfoItem({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Phone;
  label: string;
  value: ReactNode;
  href?: string;
}) {
  const content = (
    <>
      <Icon className="h-5 w-5 flex-none text-brand-yellow" />
      <div>
        <div className="text-base uppercase tracking-widest text-neutral-300">{label}</div>
        <Heading as="div" size="md" tone="dark" uppercase={false} className="mt-0.5">
          {value}
        </Heading>
      </div>
    </>
  );

  return (
    <div className="flex items-start gap-3 px-0 py-6 sm:px-8 sm:py-0 lg:px-10">
      {href ? (
        <a href={href} className="flex items-start gap-3 hover:opacity-80">
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: Array<{ label: string; href: string }>;
}) {
  return (
    <div>
      <Heading as="h4" size="xs" tone="accent" tracking="widest">
        {title}
      </Heading>
      <ul className="mt-4 space-y-3 text-lg text-neutral-200">
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} className="hover:text-brand-yellow">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
