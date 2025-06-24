'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import { MapPin, Store, Calendar, TrendingDown, Search, Filter } from 'lucide-react';

import citiesData from '@/data/cities.json';
import discountsData from '@/data/discounts.json';

interface Discount {
  id: number;
  productName: string;
  storeName: string;
  oldPrice: number;
  newPrice: number;
  validUntil: string;
  category: string;
}

export default function Discounts() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  useEffect(() => {
    if (selectedCity && selectedDistrict) {
      loadDiscounts();
    } else {
      setDiscounts([]);
    }
  }, [selectedCity, selectedDistrict]);

  const loadDiscounts = () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const cityDiscounts = discountsData[selectedCity as keyof typeof discountsData];
      if (cityDiscounts && cityDiscounts[selectedDistrict as keyof typeof cityDiscounts]) {
        setDiscounts(cityDiscounts[selectedDistrict as keyof typeof cityDiscounts] as Discount[]);
      } else {
        setDiscounts([]);
      }
      setLoading(false);
    }, 500);
  };

  const getDiscountPercentage = (oldPrice: number, newPrice: number) => {
    return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR');
  };

  const getStoreColor = (storeName: string) => {
    const colors = {
      'A101': 'bg-red-500',
      'BİM': 'bg-blue-500',
      'ŞOK': 'bg-orange-500',
      'Migros': 'bg-purple-500'
    };
    return colors[storeName as keyof typeof colors] || 'bg-gray-500';
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {t('discounts.title')}
          </h1>
          <p className="text-xl text-gray-600">
            Çevrendeki en iyi indirim fırsatlarını keşfet
          </p>
        </div>

        {/* Location Selector */}
        <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <span>Konum Seçimi</span>
            </CardTitle>
            <CardDescription>
              İndirimlerini görmek istediğin şehir ve ilçeyi seç
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  {t('discounts.select.city')}
                </label>
                <Select value={selectedCity} onValueChange={(value) => {
                  setSelectedCity(value);
                  setSelectedDistrict('');
                }}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Şehir seçin..." />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(citiesData).map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  {t('discounts.select.district')}
                </label>
                <Select 
                  value={selectedDistrict} 
                  onValueChange={setSelectedDistrict}
                  disabled={!selectedCity}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="İlçe seçin..." />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedCity && citiesData[selectedCity as keyof typeof citiesData]?.map((district) => (
                      <SelectItem key={district} value={district}>
                        {district}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Discounts List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">{t('common.loading')}</p>
          </div>
        ) : !selectedCity || !selectedDistrict ? (
          <Card className="text-center py-12 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent>
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {t('discounts.select.location')}
              </h3>
              <p className="text-gray-500">
                İndirimlerini görebilmek için yukarıdan şehir ve ilçe seçin
              </p>
            </CardContent>
          </Card>
        ) : discounts.length === 0 ? (
          <Card className="text-center py-12 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent>
              <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {t('discounts.no.discounts')}
              </h3>
              <p className="text-gray-500">
                Başka bir bölge seçmeyi deneyin
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {discounts.map((discount) => {
              const discountPercent = getDiscountPercentage(discount.oldPrice, discount.newPrice);
              
              return (
                <Card key={discount.id} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
                          {discount.productName}
                        </CardTitle>
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${getStoreColor(discount.storeName)}`}></div>
                          <span className="text-sm font-medium text-gray-700">{discount.storeName}</span>
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                        %{discountPercent}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{t('discounts.old.price')}:</span>
                        <span className="text-sm text-gray-500 line-through">₺{discount.oldPrice.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">{t('discounts.new.price')}:</span>
                        <span className="text-lg font-bold text-green-600">₺{discount.newPrice.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                        <div className="flex items-center space-x-1 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{t('discounts.valid.until')}:</span>
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {formatDate(discount.validUntil)}
                        </span>
                      </div>
                      
                      <div className="pt-2">
                        <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                          {discount.category}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}