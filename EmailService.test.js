const { EmailService, MockProvider } = require('./EmailService');

test('should send email successfully', async() => {
    const service = new EmailService([
        new MockProvider('TestProvider', 0)
    ]);
    const result = await service.sendEmail('test-id', 'a@b.com', 'test content');
    expect(result).toContain('sent email to');
    expect(service.getStatus('test-id')).toBe('SENT');
});

test('should retry and fallback on failure', async() => {
    const service = new EmailService([
        new MockProvider('FailProvider', 1),
        new MockProvider('BackupProvider', 0)
    ]);
    const result = await service.sendEmail('fallback-id', 'a@b.com', 'Hello');
    expect(result).toContain('BackupProvider');
    expect(service.getStatus('fallback-id')).toBe('SENT');
});

test('should prevent duplicate sends', async() => {
    const service = new EmailService([
        new MockProvider('TestProvider', 0)
    ]);
    await service.sendEmail('dup-id', 'x@y.com', 'First');
    const result = await service.sendEmail('dup-id', 'x@y.com', 'Second');
    expect(result).toBe('Duplicate email');
});