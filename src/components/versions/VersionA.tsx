import { StickyHeader } from "../StickyHeader";
import { FloatingApplyButton } from "../FloatingApplyButton";
import { Hero } from "../Hero";
import { HiddenGem } from "../HiddenGem";
import { TechShowcase } from "../TechShowcase";
import { VeegmachineShowcase } from "../VeegmachineShowcase";
import { JobDetails } from "../JobDetails";
import { Benefits } from "../Benefits";
import { DayInLife } from "../DayInLife";
import { Requirements } from "../Requirements";
import { Testimonials } from "../Testimonials";
import { RecruitmentApproach } from "../RecruitmentApproach";
import { FAQ } from "../FAQ";
import { ApplicationCTA } from "../ApplicationCTA";

export function VersionA() {
  return (
    <div className="min-h-screen bg-white">
      <StickyHeader />
      <FloatingApplyButton />
      <Hero />
      <HiddenGem />
      <TechShowcase />
      <VeegmachineShowcase />
      <JobDetails />
      <Benefits />
      <DayInLife />
      <Requirements />
      <Testimonials />
      <RecruitmentApproach />
      <FAQ />
      <ApplicationCTA />
    </div>
  );
}
