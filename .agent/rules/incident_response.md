---
description: Incident Response and Postmortem Policy
alwaysApply: true
---

# Incident Response and Postmortem Policy

All production incidents must follow this process.

## Severity Levels

- **Sev1**: System down / Data leak
- **Sev2**: Partial outage
- **Sev3**: Minor degradation

## Response

- **Owner**: Every incident MUST have a designated owner.
- **Comms**: Create a dedicated communication channel (Slack/Teams).
- **Notification**: Customer notification required if impact is external.

## Postmortem

Required within **72 hours** for Sev1/Sev2:

1.  **Root Cause**: Why did it happen? (5 Whys)
2.  **Impact**: What/Who was affected?
3.  **Timeline**: Detailed sequence of events.
4.  **Corrective Actions**: Immediate fix.
5.  **Preventive Actions**: Long-term fix to prevent recurrence.

## No Blame Culture

Focus on system failure, not individual error. We improve the process, not punish the person.
