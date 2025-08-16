
import { useState } from 'react';
import { CreditCard, Wallet, Building, Bitcoin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

interface PaymentGatewayProps {
  amount: number;
  currency?: string;
  bookingDetails: {
    tourName: string;
    dates: string;
    guests: number;
  };
  onPaymentSuccess: (paymentData: any) => void;
  onPaymentError: (error: string) => void;
}

export function PaymentGateway({ 
  amount, 
  currency = 'USD', 
  bookingDetails, 
  onPaymentSuccess, 
  onPaymentError 
}: PaymentGatewayProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [billingAddress, setBillingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  });

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Visa, Mastercard, American Express',
      fees: '2.9%'
    },
    {
      id: 'wallet',
      name: 'Digital Wallets',
      icon: Wallet,
      description: 'PayPal, Apple Pay, Google Pay',
      fees: '3.4%'
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: Building,
      description: 'Direct bank transfer',
      fees: 'Free'
    },
    {
      id: 'crypto',
      name: 'Cryptocurrency',
      icon: Bitcoin,
      description: 'Bitcoin, Ethereum, USDC',
      fees: '1.5%'
    }
  ];

  const cryptoCurrencies = [
    { symbol: 'BTC', name: 'Bitcoin', rate: 0.000023 },
    { symbol: 'ETH', name: 'Ethereum', rate: 0.00035 },
    { symbol: 'USDC', name: 'USD Coin', rate: 1.0 }
  ];

  const handlePayment = async () => {
    setIsProcessing(true);

    const paymentPayload = {
      amount: totalAmount,
      currency,
      method: selectedPaymentMethod,
      bookingDetails,
      cardDetails: selectedPaymentMethod === 'card' ? cardDetails : undefined,
    };

    try {
      const response = await fetch('/api/payments/charge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentPayload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        onPaymentSuccess({
          ...result,
          method: selectedPaymentMethod,
          amount: totalAmount,
        });
      } else {
        onPaymentError(result.message || 'Payment failed');
      }
    } catch (error) {
      onPaymentError('An unexpected error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const calculateFees = () => {
    const method = paymentMethods.find(pm => pm.id === selectedPaymentMethod);
    if (!method || method.fees === 'Free') return 0;
    
    const feePercentage = parseFloat(method.fees.replace('%', '')) / 100;
    return amount * feePercentage;
  };

  const totalAmount = amount + calculateFees();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Booking Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Booking Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="font-medium">{bookingDetails.tourName}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Travel Dates</span>
              <span>{bookingDetails.dates}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Guests</span>
              <span>{bookingDetails.guests} people</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Processing fee</span>
                <span>${calculateFees().toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t mt-2 pt-2">
                <span>Total</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Select Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              return (
                <div
                  key={method.id}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedPaymentMethod === method.id
                      ? 'border-teal-500 bg-teal-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedPaymentMethod(method.id)}
                >
                  <div className="flex items-start space-x-3">
                    <Icon className="w-6 h-6 text-teal-600 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{method.name}</h3>
                      <p className="text-sm text-gray-600">{method.description}</p>
                      <Badge variant="secondary" className="mt-1">
                        Fee: {method.fees}
                      </Badge>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Payment Forms */}
          <Tabs value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
            <TabsContent value="card" className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Card Number</label>
                  <Input
                    placeholder="1234 5678 9012 3456"
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails(prev => ({ ...prev, number: e.target.value }))}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Expiry Date</label>
                    <Input
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails(prev => ({ ...prev, expiry: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">CVV</label>
                    <Input
                      placeholder="123"
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails(prev => ({ ...prev, cvv: e.target.value }))}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Cardholder Name</label>
                  <Input
                    placeholder="John Doe"
                    value={cardDetails.name}
                    onChange={(e) => setCardDetails(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="wallet" className="space-y-4">
              <div className="text-center py-8">
                <Wallet className="w-16 h-16 text-teal-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Choose Your Digital Wallet</h3>
                <div className="space-y-2">
                  <Button className="w-full" variant="outline">Pay with PayPal</Button>
                  <Button className="w-full" variant="outline">Pay with Apple Pay</Button>
                  <Button className="w-full" variant="outline">Pay with Google Pay</Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="bank" className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Bank Transfer Instructions</h3>
                <div className="text-sm text-blue-800 space-y-1">
                  <p><strong>Bank Name:</strong> Bhutan National Bank</p>
                  <p><strong>Account Number:</strong> 123456789</p>
                  <p><strong>Swift Code:</strong> BNBBBTBT</p>
                  <p><strong>Reference:</strong> BKG{Date.now()}</p>
                </div>
                <p className="text-xs text-blue-700 mt-3">
                  Please include the reference number in your transfer and send confirmation to payments@bhutanmindbreak.com
                </p>
              </div>
            </TabsContent>

            <TabsContent value="crypto" className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Select Cryptocurrency</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose cryptocurrency" />
                  </SelectTrigger>
                  <SelectContent>
                    {cryptoCurrencies.map((crypto) => (
                      <SelectItem key={crypto.symbol} value={crypto.symbol}>
                        {crypto.name} ({crypto.symbol}) - {(totalAmount * crypto.rate).toFixed(6)} {crypto.symbol}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="font-semibold text-orange-900 mb-2">Binance Pay Integration</h3>
                <p className="text-sm text-orange-800 mb-3">
                  Pay with cryptocurrency through Binance Pay for lower fees and faster processing.
                </p>
                <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                  Pay with Binance Pay
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          {/* Billing Address */}
          {(selectedPaymentMethod === 'card' || selectedPaymentMethod === 'bank') && (
            <div className="mt-6 space-y-4">
              <h3 className="font-semibold">Billing Address</h3>
              <div className="grid grid-cols-1 gap-4">
                <Input
                  placeholder="Street Address"
                  value={billingAddress.street}
                  onChange={(e) => setBillingAddress(prev => ({ ...prev, street: e.target.value }))}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="City"
                    value={billingAddress.city}
                    onChange={(e) => setBillingAddress(prev => ({ ...prev, city: e.target.value }))}
                  />
                  <Input
                    placeholder="State/Province"
                    value={billingAddress.state}
                    onChange={(e) => setBillingAddress(prev => ({ ...prev, state: e.target.value }))}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="ZIP/Postal Code"
                    value={billingAddress.zip}
                    onChange={(e) => setBillingAddress(prev => ({ ...prev, zip: e.target.value }))}
                  />
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="US">United States</SelectItem>
                      <SelectItem value="UK">United Kingdom</SelectItem>
                      <SelectItem value="IN">India</SelectItem>
                      <SelectItem value="AU">Australia</SelectItem>
                      <SelectItem value="CA">Canada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8">
            <Button 
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold py-3 text-lg"
            >
              {isProcessing ? 'Processing Payment...' : `Pay $${totalAmount.toFixed(2)}`}
            </Button>
            
            <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-gray-500">
              <span>🔒 Secure Payment</span>
              <span>•</span>
              <span>SSL Encrypted</span>
              <span>•</span>
              <span>PCI Compliant</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
