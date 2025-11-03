import { StickyHeader } from "../StickyHeader";
import { FloatingApplyButton } from "../FloatingApplyButton";
import { Hero } from "../Hero";
import { HiddenGem } from "../HiddenGem";
import { SalaryBreakdown } from "../SalaryBreakdown";
import { TechShowcase } from "../TechShowcase";
import { VeegmachineShowcase } from "../VeegmachineShowcase";
import { Benefits } from "../Benefits";
import { DayInLife } from "../DayInLife";
import { Testimonials } from "../Testimonials";
import { RecruitmentApproach } from "../RecruitmentApproach";
import { TrustSignals } from "../TrustSignals";
import { FAQ } from "../FAQ";
import { ApplicationCTA } from "../ApplicationCTA";

export function VersionC() {
  return (
    <div className="min-h-screen bg-white">
      <StickyHeader />
      <FloatingApplyButton />
      <Hero />
      <SalaryBreakdown />
      <HiddenGem />
      <TechShowcase />
      <VeegmachineShowcase />
      <Benefits />
      <DayInLife />
      <Testimonials />
      <RecruitmentApproach />
      <TrustSignals />
      <FAQ />
      <ApplicationCTA />
    </div>
  );
}
