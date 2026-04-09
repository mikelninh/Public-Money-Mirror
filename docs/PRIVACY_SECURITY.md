# Privacy & Security Controls

## Overview

Public Money Mirror implements security and privacy controls aligned with SOC 2 Type I principles and GDPR requirements.

## Data Protection

### GDPR Compliance

- **Lawful Basis**: Legitimate interest (public spending transparency) and contract performance
- **Data Minimization**: Only collect necessary procurement and budget data
- **Purpose Limitation**: Use data solely for anomaly detection and savings identification
- **Retention**: Retain data per contract terms and legal requirements
- **Right to Erasure**: Honor data deletion requests where legally permitted

### Data Classification

1. **Public Data**: Budget allocations, public tenders (freely accessible)
2. **Internal Data**: Anomaly scores, case details (access-controlled)
3. **Confidential Data**: Client-specific procurement details (encrypted, restricted access)

## Security Controls

### Authentication & Authorization

- **JWT Tokens**: Stateless authentication with expiration
- **Role-Based Access Control (RBAC)**: Admin, Analyst, Gov Client, Consumer roles
- **Password Hashing**: bcrypt with salt rounds
- **Token Refresh**: Configurable token expiration (default: 30 minutes)

### Data Encryption

- **At Rest**: Database encryption (Postgres)
- **In Transit**: HTTPS/TLS for all API communications
- **Secrets Management**: Environment variables, not hardcoded

### API Security

- **Rate Limiting**: Per-endpoint rate limits on public endpoints
- **CORS**: Configured allowlist for frontend origins
- **Input Validation**: Pydantic schemas for all inputs
- **SQL Injection Protection**: SQLModel ORM (parameterized queries)

### Infrastructure Security

- **Container Security**: Minimal base images, regular updates
- **Network Isolation**: Docker network segmentation
- **Secrets**: Not committed to version control
- **Audit Logging**: User actions logged (future enhancement)

## Access Controls

### User Roles

1. **Admin**: Full system access
2. **Analyst**: Case creation, recovery kits, invoices
3. **Gov Client**: Read-only + recovery kit requests
4. **Consumer**: Public site + premium alerts (if subscribed)

### Principle of Least Privilege

- Users granted minimum permissions necessary
- Role assignments reviewed regularly

## Data Handling

### Data Sources

- **Public Data**: OpenSpending, Bundeshaushalt, TED (public APIs)
- **Client Data**: Provided via secure upload or API (encrypted)

### Data Processing

- **ETL**: Secure pipelines with error handling
- **Analytics**: Anonymized where possible
- **Storage**: PostgreSQL with access controls

### Data Sharing

- **No Third-Party Sharing**: Data not sold or shared with third parties
- **Anonymized Insights**: May use aggregated, anonymized data for research
- **Legal Requirements**: Comply with court orders or legal requirements

## Incident Response

### Security Incidents

1. **Detection**: Monitor logs and alerts
2. **Containment**: Isolate affected systems
3. **Investigation**: Root cause analysis
4. **Notification**: Notify affected clients within 72 hours (if required)
5. **Remediation**: Fix vulnerabilities and restore services

### Breach Notification

- **GDPR**: Notify supervisory authority within 72 hours if personal data breach
- **Clients**: Notify affected clients without undue delay

## Audit & Compliance

### Audit Logging (Planned)

- User authentication events
- Data access events
- Administrative actions
- API usage patterns

### Compliance Reviews

- Annual security review
- GDPR compliance assessment
- Third-party security audits (planned)

## Third-Party Services

### Service Providers

- **Stripe**: Payment processing (PCI-DSS compliant)
- **Hosting**: Cloud provider with security certifications
- **Monitoring**: Secure logging and monitoring tools

### Vendor Management

- Review third-party security practices
- Contracts with data protection clauses
- Regular vendor assessments

## Privacy Policy

### For Public Web Users

- **Data Collected**: Email (for subscriptions), alert preferences
- **Purpose**: Provide premium alerts and services
- **Retention**: While subscription active + 30 days
- **Rights**: Access, correction, deletion requests

### For Government Clients

- **Data Collected**: Procurement data provided by client
- **Purpose**: Anomaly detection and savings identification
- **Retention**: Per contract terms
- **Rights**: Full control over data deletion

## Security Best Practices

### For Users

- Use strong passwords
- Don't share credentials
- Report suspicious activity

### For Organization

- Regular security training
- Vulnerability assessments
- Security updates applied promptly
- Secure development lifecycle (SDLC)

## Contact

For security concerns or data protection inquiries:

- **Email**: security@publicmoneymirror.com
- **Privacy Officer**: privacy@publicmoneymirror.com

---

**Last Updated**: 2024

