-- Privacy consent is verplicht voor alle sollicitaties
-- Zonder akkoord mag geen persoonsdata verwerkt worden (AVG Art. 6)

ALTER TABLE applications
  ADD CONSTRAINT applications_privacy_required
  CHECK (privacy_consent = true);
