import { POST } from '@/app/api/submit-application/route';
import { NextResponse } from 'next/server';

jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data, options) => ({
      json: async () => data,
      status: options?.status || 200
    }))
  }
}));

describe('Submit Application API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('successfully submits application', async () => {
    const mockFormData = {
      name: 'John Doe',
      email: 'john@example.com',
      nationalId: '123456789'
    };

    const mockRequest = {
      json: jest.fn().mockResolvedValue(mockFormData)
    };

    // Mock Math.random to avoid error simulation
    jest.spyOn(Math, 'random').mockReturnValue(0.1);

    // Mock setTimeout to execute immediately
    jest.spyOn(global, 'setTimeout').mockImplementation((cb) => {
      cb();
      return 1;
    });

    const response = await POST(mockRequest);

    expect(mockRequest.json).toHaveBeenCalled();
    expect(NextResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        applicationNumber: expect.stringMatching(/^APP-\d+-\d+$/),
        message: 'Your application has been successfully submitted.',
        data: expect.objectContaining({
          submittedAt: expect.any(String),
          estimatedProcessingTime: '5-7 business days'
        })
      })
    );
  });

  it('handles request errors gracefully', async () => {
    const mockRequest = {
      json: jest.fn().mockRejectedValue(new Error('Invalid JSON'))
    };

    const response = await POST(mockRequest);

    expect(NextResponse.json).toHaveBeenCalledWith(
      { error: 'Failed to submit application' },
      { status: 500 }
    );
  });

  it('simulates occasional server errors', async () => {
    const mockFormData = { name: 'John Doe' };
    const mockRequest = {
      json: jest.fn().mockResolvedValue(mockFormData)
    };

    // Mock Math.random to trigger error simulation
    jest.spyOn(Math, 'random').mockReturnValue(0.01);

    // Mock setTimeout to execute immediately
    jest.spyOn(global, 'setTimeout').mockImplementation((cb) => {
      cb();
      return 1;
    });

    const response = await POST(mockRequest);

    expect(NextResponse.json).toHaveBeenCalledWith(
      { error: 'Server error. Please try again.' },
      { status: 500 }
    );
  });
});