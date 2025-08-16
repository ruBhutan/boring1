
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { CheckCircle, Clock, AlertCircle, DollarSign, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BinancePayIntegrationProps {
  amount: number;
  currency?: string;
  orderID: string;
  userEmail: string;
  binancePayId: string;
  onPaymentComplete: (paymentData: any) => void;
  onPaymentCancel: () => void;
}

export default function BinancePayIntegration({
  amount,
  currency = 'USD',
  orderID,
  userEmail,
  binancePayId,
  onPaymentComplete,
  onPaymentCancel
}: BinancePayIntegrationProps) {
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'completed' | 'failed'>('pending');
  const [paymentUrl, setPaymentUrl] = useState<string>('');
  const [qrCode, setQrCode] = useState<string>('');
  const [timeRemaining, setTimeRemaining] = useState(15 * 60); // 15 minutes in seconds
  const { toast } = useToast();

  // Simulate Binance Pay payment creation
  const initiateBinancePayment = async () => {
    setPaymentStatus('processing');
    
    try {
      // In a real implementation, this would call Binance Pay API
      // For demo purposes, we'll simulate the payment creation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock payment URL and QR code
      const mockPaymentUrl = `https://app.binance.com/en/pay/checkout/${orderID}`;
      const mockQrCode = `binancepay://app.binance.com/pay/${orderID}`;
      
      setPaymentUrl(mockPaymentUrl);
      setQrCode(mockQrCode);
      setPaymentStatus('pending');
      
      // Start countdown timer
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setPaymentStatus('failed');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Simulate payment completion after 10 seconds (for demo)
      setTimeout(() => {
        clearInterval(timer);
        setPaymentStatus('completed');
        onPaymentComplete({
          paymentMethod: 'binance',
          transactionId: `BNB_${orderID}`,
          amount,
          currency,
          status: 'completed'
        });
      }, 10000);
      
    } catch (error) {
      setPaymentStatus('failed');
      toast({
        title: "Payment Failed",
        description: "Failed to create Binance Pay payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Payment link copied to clipboard.",
    });
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (paymentStatus === 'completed') {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="text-center p-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Payment Successful!</h3>
          <p className="text-gray-600 mb-4">
            Your Binance Pay payment has been processed successfully.
          </p>
          <Badge variant="outline" className="bg-green-50 text-green-700">
            Transaction ID: BNB_{orderID}
          </Badge>
        </CardContent>
      </Card>
    );
  }

  if (paymentStatus === 'failed') {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="text-center p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Payment Failed</h3>
          <p className="text-gray-600 mb-4">
            The payment session has expired or failed. Please try again.
          </p>
          <div className="space-y-2">
            <Button onClick={initiateBinancePayment} className="btn-brand-primary">
              Try Again
            </Button>
            <Button variant="outline" onClick={onPaymentCancel}>
              Cancel Payment
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Binance Pay Payment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Payment Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Amount:</span>
                    <span className="font-medium">{amount} {currency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Order ID:</span>
                    <span className="font-medium">{orderID}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pay ID:</span>
                    <span className="font-medium">{binancePayId}</span>
                  </div>
                </div>
              </div>

              {paymentStatus === 'pending' && timeRemaining > 0 && (
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-yellow-600" />
                    <span className="font-medium text-yellow-800">Time Remaining</span>
                  </div>
                  <div className="text-2xl font-bold text-yellow-800">
                    {formatTime(timeRemaining)}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {paymentStatus === 'processing' ? (
                <div className="text-center p-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Creating Binance Pay payment...</p>
                </div>
              ) : paymentUrl ? (
                <>
                  <div className="text-center p-6 bg-teal-50 rounded-lg">
                    <div className="w-32 h-32 bg-white p-4 rounded-lg mx-auto mb-4">
                      {/* QR Code placeholder - in real implementation, generate actual QR code */}
                      <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-xs text-gray-500">QR Code</span>
                      </div>
                    </div>
                    <p className="text-sm text-teal-800 mb-2">Scan with Binance App</p>
                    <p className="text-xs text-teal-600">or use the payment link below</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={paymentUrl}
                        readOnly
                        className="flex-1 p-2 border rounded text-sm"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(paymentUrl)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>

                    <Button
                      onClick={() => window.open(paymentUrl, '_blank')}
                      className="w-full btn-brand-primary"
                    >
                      Open Binance Pay
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center p-6">
                  <Button
                    onClick={initiateBinancePayment}
                    className="btn-brand-primary"
                    size="lg"
                  >
                    Initiate Binance Payment
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h5 className="font-medium text-blue-900 mb-2">Payment Instructions:</h5>
            <ol className="text-sm text-blue-800 list-decimal list-inside space-y-1">
              <li>Click "Initiate Binance Payment" or scan the QR code</li>
              <li>Open your Binance app and confirm the payment</li>
              <li>Complete the transaction within the time limit</li>
              <li>You'll receive confirmation once payment is processed</li>
            </ol>
          </div>

          <div className="mt-4 flex justify-between">
            <Button variant="outline" onClick={onPaymentCancel}>
              Cancel Payment
            </Button>
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Auto-refresh enabled
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
