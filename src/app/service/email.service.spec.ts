import { TestBed } from '@angular/core/testing';

import { EmailService } from './email.service';

describe('EmailService', () => {
  let service: EmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // sendEmail is still a stub (TODO). This documents the current behaviour and
  // must be updated once the real implementation lands.
  it('sendEmail throws until it is implemented', () => {
    expect(() => service.sendEmail()).toThrowError('sendEmail is not ready!');
  });
});
