
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { Calendar, Users, CreditCard, Shield, CheckCircle, DollarSign } from 'lucide-react';
import BinancePayIntegration from './BinancePayIntegration';

interface BookingPaymentSystemProps {
  tourId?: string;
  tourTitle?: string;
  basePrice?: number;
  onClose?: () => void;
}

export default function BookingPaymentSystem({ 
  tourId, 
  tourTitle = "Bhutan Cultural Experience", 
  basePrice = 2500,
  onClose 
}: BookingPaymentSystemProps) {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    startDate: '',
    duration: '7',
    travelers: '2',
    accommodation: 'luxury',
    transport: 'private',
    specialRequests: ''
  });
  
  const [paymentData, setPaymentData] = useState({
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    email: '',
    phone: '',
    binancePayId: '',
    cryptoWallet: '',
    billingCountry: '',
    billingZip: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [showBinancePay, setShowBinancePay] = useState(false);

  const calculateTotal = () => {
    let total = basePrice * parseInt(bookingData.travelers);
    
    // Accommodation pricing
    const accommodationPrices = {
      luxury: 200,
      premium: 150,
      standard: 100,
      boutique: 175
    };
    
    total += accommodationPrices[bookingData.accommodation as keyof typeof accommodationPrices] * parseInt(bookingData.duration);
    
    // Transport pricing
    if (bookingData.transport === 'private') total += 100 * parseInt(bookingData.duration);
    
    return total;
  };

  const handleBookingSubmit = () => {
    setStep(2);
  };

  const handlePaymentSubmit = async () => {
    if (paymentData.paymentMethod === 'binance') {
      setShowBinancePay(true);
      return;
    }

    setIsProcessing(true);
    
    try {
      // Handle international card payments
      if (['card', 'visa', 'mastercard', 'amex'].includes(paymentData.paymentMethod)) {
        const paymentRequest = {
          amount: calculateTotal(),
          currency: 'USD',
          orderID: `BT${Date.now()}`,
          cardData: {
            paymentMethod: paymentData.paymentMethod,
            cardNumber: paymentData.cardNumber.replace(/\s/g, ''),
            expiryDate: paymentData.expiryDate,
            cvv: paymentData.cvv,
            cardName: paymentData.cardName
          },
          billingInfo: {
            country: paymentData.billingCountry,
            postalCode: paymentData.billingZip
          },
          userEmail: paymentData.email
        };

        // Create payment intent
        const response = await fetch('/api/payments/card/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(paymentRequest)
        });

        if (!response.ok) {
          throw new Error('Payment creation failed');
        }

        const paymentIntent = await response.json();

        // Simulate 3D Secure authentication and confirmation
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Confirm payment
        const confirmResponse = await fetch('/api/payments/card/confirm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentId: paymentIntent.paymentId,
            paymentIntentId: paymentIntent.paymentIntentId
          })
        });

        if (!confirmResponse.ok) {
          throw new Error('Payment confirmation failed');
        }

        const confirmation = await confirmResponse.json();
        
        if (confirmation.status === 'succeeded') {
          setIsProcessing(false);
          setBookingConfirmed(true);
          setStep(3);
        } else {
          throw new Error('Payment was not successful');
        }
      }
    } catch (error) {
      setIsProcessing(false);
      console.error('Payment error:', error);
      // In a real app, show error message to user
      alert('Payment failed. Please try again or use a different payment method.');
    }
  };

  const handleBinancePaymentComplete = (paymentResult: any) => {
    setShowBinancePay(false);
    setBookingConfirmed(true);
    setStep(3);
  };

  const handleBinancePaymentCancel = () => {
    setShowBinancePay(false);
  };

  if (showBinancePay) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <BinancePayIntegration
          amount={calculateTotal()}
          currency="USD"
          orderID={`BT${Date.now()}`}
          userEmail={paymentData.email}
          binancePayId={paymentData.binancePayId}
          onPaymentComplete={handleBinancePaymentComplete}
          onPaymentCancel={handleBinancePaymentCancel}
        />
      </div>
    );
  }

  if (bookingConfirmed) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card className="text-center">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
            <p className="text-gray-600 mb-4">
              Your Bhutan adventure is confirmed. Confirmation details have been sent to your email.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p><strong>Booking ID:</strong> BT{Date.now()}</p>
              <p><strong>Tour:</strong> {tourTitle}</p>
              <p><strong>Travelers:</strong> {bookingData.travelers} people</p>
              <p><strong>Duration:</strong> {bookingData.duration} days</p>
              <p><strong>Total Amount:</strong> ${calculateTotal().toLocaleString()}</p>
              <p><strong>Payment Method:</strong> {
                paymentData.paymentMethod === 'binance' ? 'Binance Pay' :
                paymentData.paymentMethod === 'visa' ? 'Visa Card' :
                paymentData.paymentMethod === 'mastercard' ? 'Mastercard' :
                paymentData.paymentMethod === 'amex' ? 'American Express' :
                'International Card'
              }</p>
            </div>
            <Button onClick={onClose} className="btn-brand-primary">
              Continue Exploring
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold gradient-text">Book Your Bhutan Adventure</h1>
          <Badge variant="outline" className="text-sm">
            Step {step} of 2
          </Badge>
        </div>
        
        <div className="flex space-x-4 mb-6">
          <div className={`flex-1 h-2 rounded ${step >= 1 ? 'bg-teal-600' : 'bg-gray-200'}`} />
          <div className={`flex-1 h-2 rounded ${step >= 2 ? 'bg-teal-600' : 'bg-gray-200'}`} />
        </div>
      </div>

      {step === 1 && (
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Trip Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="startDate">Preferred Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={bookingData.startDate}
                  onChange={(e) => setBookingData(prev => ({ ...prev, startDate: e.target.value }))}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <Label htmlFor="duration">Duration</Label>
                <Select value={bookingData.duration} onValueChange={(value) => setBookingData(prev => ({ ...prev, duration: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 Days</SelectItem>
                    <SelectItem value="7">7 Days</SelectItem>
                    <SelectItem value="10">10 Days</SelectItem>
                    <SelectItem value="14">14 Days</SelectItem>
                    <SelectItem value="21">21 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="travelers">Number of Travelers</Label>
                <Select value={bookingData.travelers} onValueChange={(value) => setBookingData(prev => ({ ...prev, travelers: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Person</SelectItem>
                    <SelectItem value="2">2 People</SelectItem>
                    <SelectItem value="3">3 People</SelectItem>
                    <SelectItem value="4">4 People</SelectItem>
                    <SelectItem value="5">5 People</SelectItem>
                    <SelectItem value="6">6+ People</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="accommodation">Accommodation Level</Label>
                <Select value={bookingData.accommodation} onValueChange={(value) => setBookingData(prev => ({ ...prev, accommodation: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="luxury">Luxury Hotels (+$200/night)</SelectItem>
                    <SelectItem value="boutique">Boutique Hotels (+$175/night)</SelectItem>
                    <SelectItem value="premium">Premium Hotels (+$150/night)</SelectItem>
                    <SelectItem value="standard">Standard Hotels (+$100/night)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="transport">Transportation</Label>
                <Select value={bookingData.transport} onValueChange={(value) => setBookingData(prev => ({ ...prev, transport: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="private">Private Vehicle (+$100/day)</SelectItem>
                    <SelectItem value="shared">Shared Transport (Included)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Tour Package ({bookingData.travelers} travelers)</span>
                  <span>${(basePrice * parseInt(bookingData.travelers)).toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Accommodation ({bookingData.duration} nights)</span>
                  <span>${(bookingData.accommodation === 'luxury' ? 200 : 
                           bookingData.accommodation === 'boutique' ? 175 :
                           bookingData.accommodation === 'premium' ? 150 : 100) * parseInt(bookingData.duration)}</span>
                </div>
                
                {bookingData.transport === 'private' && (
                  <div className="flex justify-between">
                    <span>Private Transport ({bookingData.duration} days)</span>
                    <span>${100 * parseInt(bookingData.duration)}</span>
                  </div>
                )}
                
                <Separator />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount</span>
                  <span className="text-teal-600">${calculateTotal().toLocaleString()}</span>
                </div>
                
                <div className="bg-teal-50 p-4 rounded-lg mt-4">
                  <p className="text-sm text-teal-800">
                    <Shield className="w-4 h-4 inline mr-2" />
                    Secure booking with instant confirmation
                  </p>
                  <p className="text-sm text-teal-800 mt-1">
                    Free cancellation up to 7 days before departure
                  </p>
                </div>
              </div>
              
              <Button 
                onClick={handleBookingSubmit}
                className="w-full mt-6 btn-brand-primary"
                disabled={!bookingData.startDate}
              >
                Proceed to Payment
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {step === 2 && (
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={paymentData.email}
                  onChange={(e) => setPaymentData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={paymentData.phone}
                  onChange={(e) => setPaymentData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Select value={paymentData.paymentMethod} onValueChange={(value) => setPaymentData(prev => ({ ...prev, paymentMethod: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="card">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4" />
                        International Credit/Debit Card
                      </div>
                    </SelectItem>
                    <SelectItem value="visa">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-blue-600" />
                        Visa Card
                      </div>
                    </SelectItem>
                    <SelectItem value="mastercard">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-red-600" />
                        Mastercard
                      </div>
                    </SelectItem>
                    <SelectItem value="amex">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-green-600" />
                        American Express
                      </div>
                    </SelectItem>
                    <SelectItem value="binance">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        Binance Pay
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(['card', 'visa', 'mastercard', 'amex'].includes(paymentData.paymentMethod)) && (
                <>
                  <div>
                    <Label htmlFor="cardName">Cardholder Name</Label>
                    <Input
                      id="cardName"
                      value={paymentData.cardName}
                      onChange={(e) => setPaymentData(prev => ({ ...prev, cardName: e.target.value }))}
                      placeholder="John Doe (as on card)"
                    />
                  </div>

                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      value={paymentData.cardNumber}
                      onChange={(e) => {
                        // Format card number with spaces
                        const value = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
                        const formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ');
                        setPaymentData(prev => ({ ...prev, cardNumber: formatted }));
                      }}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        value={paymentData.expiryDate}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          const formatted = value.replace(/(\d{2})(\d)/, '$1/$2');
                          setPaymentData(prev => ({ ...prev, expiryDate: formatted }));
                        }}
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        value={paymentData.cvv}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          setPaymentData(prev => ({ ...prev, cvv: value }));
                        }}
                        placeholder={paymentData.paymentMethod === 'amex' ? '1234' : '123'}
                        maxLength={paymentData.paymentMethod === 'amex' ? 4 : 3}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="billingCountry">Billing Country</Label>
                      <Select value={paymentData.billingCountry || ''} onValueChange={(value) => setPaymentData(prev => ({ ...prev, billingCountry: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="US">United States</SelectItem>
                          <SelectItem value="GB">United Kingdom</SelectItem>
                          <SelectItem value="CA">Canada</SelectItem>
                          <SelectItem value="AU">Australia</SelectItem>
                          <SelectItem value="DE">Germany</SelectItem>
                          <SelectItem value="FR">France</SelectItem>
                          <SelectItem value="JP">Japan</SelectItem>
                          <SelectItem value="SG">Singapore</SelectItem>
                          <SelectItem value="IN">India</SelectItem>
                          <SelectItem value="CN">China</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="billingZip">Billing ZIP/Postal Code</Label>
                      <Input
                        id="billingZip"
                        value={paymentData.billingZip || ''}
                        onChange={(e) => setPaymentData(prev => ({ ...prev, billingZip: e.target.value }))}
                        placeholder="12345 or AB1 2CD"
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-800 mb-2">
                      <Shield className="w-4 h-4 inline mr-2" />
                      International Card Payment Features:
                    </p>
                    <ul className="text-sm text-blue-700 list-disc list-inside space-y-1">
                      <li>Secure 3D authentication for international transactions</li>
                      <li>Real-time currency conversion at competitive rates</li>
                      <li>Multi-currency support (USD, EUR, GBP, etc.)</li>
                      <li>Fraud protection and chargeback protection</li>
                      <li>Instant payment confirmation</li>
                    </ul>
                  </div>

                  {paymentData.paymentMethod !== 'card' && (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <CreditCard className="w-4 h-4 inline mr-2" />
                        {paymentData.paymentMethod === 'visa' && 'Visa Secure payment processing'}
                        {paymentData.paymentMethod === 'mastercard' && 'Mastercard SecureCode protection'}
                        {paymentData.paymentMethod === 'amex' && 'American Express SafeKey verification'}
                      </p>
                    </div>
                  )}
                </>
              )}

              {paymentData.paymentMethod === 'binance' && (
                <>
                  <div>
                    <Label htmlFor="binancePayId">Binance Pay ID</Label>
                    <Input
                      id="binancePayId"
                      value={paymentData.binancePayId}
                      onChange={(e) => setPaymentData(prev => ({ ...prev, binancePayId: e.target.value }))}
                      placeholder="Your Binance Pay ID or Email"
                    />
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-sm text-yellow-800 mb-2">
                      <DollarSign className="w-4 h-4 inline mr-2" />
                      Binance Pay Instructions:
                    </p>
                    <ul className="text-sm text-yellow-800 list-disc list-inside space-y-1">
                      <li>Make sure you have sufficient balance in your Binance account</li>
                      <li>You'll receive a payment request via Binance Pay</li>
                      <li>Complete the payment within 15 minutes</li>
                      <li>Transaction fees may apply as per Binance policy</li>
                    </ul>
                  </div>

                  <div className="bg-teal-50 p-4 rounded-lg">
                    <p className="text-sm text-teal-800">
                      <Shield className="w-4 h-4 inline mr-2" />
                      Supported Cryptocurrencies: BTC, ETH, BNB, BUSD, USDT
                    </p>
                  </div>
                </>
              )}

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  <Shield className="w-4 h-4 inline mr-2" />
                  Your payment is secured with enterprise-grade encryption
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Final Booking Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Tour:</span>
                  <span>{tourTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span>Start Date:</span>
                  <span>{bookingData.startDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span>{bookingData.duration} days</span>
                </div>
                <div className="flex justify-between">
                  <span>Travelers:</span>
                  <span>{bookingData.travelers} people</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-teal-600">${calculateTotal().toLocaleString()}</span>
                </div>
              </div>
              
              <Button 
                onClick={handlePaymentSubmit}
                className="w-full mt-6 btn-brand-primary"
                disabled={isProcessing || !paymentData.email || 
                  (['card', 'visa', 'mastercard', 'amex'].includes(paymentData.paymentMethod) && 
                    (!paymentData.cardName || !paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvv)) ||
                  (paymentData.paymentMethod === 'binance' && !paymentData.binancePayId)}
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Processing Payment...
                  </>
                ) : (
                  `Confirm & Pay $${calculateTotal().toLocaleString()}`
                )}
              </Button>
              
              <p className="text-xs text-gray-500 mt-2 text-center">
                By confirming your payment, you agree to our Terms & Conditions
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
