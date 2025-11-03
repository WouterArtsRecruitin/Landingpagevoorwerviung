import { StickyHeader } from "../StickyHeader";
import { FloatingApplyButton } from "../FloatingApplyButton";
import { Hero } from "../Hero";
import { TechShowcase } from "../TechShowcase";
import { Benefits } from "../Benefits";
import { DayInLife } from "../DayInLife";
import { Testimonials } from "../Testimonials";
import { RecruitmentApproach } from "../RecruitmentApproach";
import { ApplicationCTA } from "../ApplicationCTA";

export function VersionB() {
  return (
    <div className="min-h-screen bg-white">
      <StickyHeader />
      <FloatingApplyButton />
      <Hero />
      <TechShowcase />
      <Benefits />
      <DayInLife />
      <Testimonials />
      <RecruitmentApproach />
      <ApplicationCTA />
    </div>
  );
}
