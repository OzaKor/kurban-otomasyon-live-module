import Logo from '@/components/layout/logo';
import CurrentTime from '@/components/current-time';
const CutInfo = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/* Üst Logo Alanı */}
            <div className="bg-white p-4 flex flex-col items-center justify-center">
                <Logo className="h-28 mb-4"/>
                <h1 className="text-2xl font-bold text-green-700 text-center">Kurban Kesim Kuralları</h1>
                <div className="text-gray-500 mt-2">
                    <CurrentTime />
                </div>
            </div>

            {/* Ana İçerik */}
            <div className="flex-grow bg-white m-6 p-6 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Sol Sütun - Kurallar */}
                    <div className="border-r border-gray-200 pr-6">
                        <h2 className="text-xl font-semibold text-green-600 mb-4">Kesim Günü Uyulması Gereken Kurallar</h2>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">•</span>
                                <span>Kurban kesimi için belirlenen alanda bulununuz.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">•</span>
                                <span>Sıranızı beklerken görevlilerin yönlendirmelerine uyunuz.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">•</span>
                                <span>Kesim yapılırken uygun mesafede durunuz.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">•</span>
                                <span>Çocukların kesim alanına girmesine izin vermeyiniz.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">•</span>
                                <span>Hayvanın kesimi için tüm izinlerin alındığından emin olunuz.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">•</span>
                                <span>Kesim işlemi bittikten sonra temizlik ve hijyen kurallarına uyunuz.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">•</span>
                                <span>Kesilen kurbanın etini uygun şekilde paketleyip muhafaza ediniz.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">•</span>
                                <span>Çevre temizliğine dikkat ediniz.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Sağ Sütun - Bilgilendirme */}
                    <div className="pl-6">
                        <h2 className="text-xl font-semibold text-red-600 mb-4">Önemli Bilgilendirme</h2>
                        <div className="bg-red-50 p-4 rounded-md border-l-4 border-red-500 mb-6">
                            <p className="text-red-700">Şu anda kesim işlemi <span className="font-bold">durdurulmuştur</span>
                                veya <span className="font-bold">henüz başlamamıştır</span>. Lütfen görevlilerin
                                yönlendirmelerini takip ediniz.</p>
                        </div>

                        <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-500 mb-6">
                            <h3 className="font-semibold text-yellow-700 mb-2">Kesim Sırası</h3>
                            <p>Kesim sırası, kayıt yaptırma sırasına göre belirlenmiştir. Tüm kayıtlı kurbanlar kesim
                                sırasına göre işleme alınacaktır.</p>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-md border-l-4 border-blue-500">
                            <h3 className="font-semibold text-blue-700 mb-2">Özel Not</h3>
                            <p id="special-note">Kurban kesim alanında güvenlik önlemleri artırılmıştır. Lütfen
                                yetkililerin uyarılarına dikkat ediniz ve belirlenen alanlarda bekleyiniz.</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Durum Bilgisi - Yeşil versiyonu */}
            <div className="bg-white mx-6 mb-6 p-4 rounded-lg shadow-md">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                            <span className="text-gray-700">Kesim Durumu: <span className="font-semibold text-green-600">Durduruldu</span></span>
                        </div>
                    </div>
                </div>


            {/* Alt Logo Alanı */}
            <div className="bg-white mt-auto p-4 flex justify-center items-center">
                <Logo className='h-20'/>
            </div>
        </div>
    )
}

export default CutInfo;
