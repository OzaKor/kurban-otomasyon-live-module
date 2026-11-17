import useCutListStore from "@/store/cuts/useCutListSrore";
import useCutDialogStore from "@/store/cuts/useCutDialogStore";
import useCutSettingStore from "@/store/cuts/useCutSettingStore";

/**
 * Oturum kapanınca / düşünce canlı kesim verisini bellekten ve sessionStorage'dan siler.
 * Eskiden bu iş tam sayfa yenilemeyle (window.location.assign) örtük yapılıyordu; artık
 * yönlendirme router ile yapıldığı için temizlik burada açıkça yapılır.
 *
 * ⚠️ Kişisel veri (hissedar adı, bedel, borç vb.) tutan YENİ bir store eklersen
 * onu da burada sıfırla; aksi hâlde aynı sekmede giriş yapan sonraki kullanıcı görebilir.
 *
 * Not: useUserStore bu dosyayı import etmez (döngüsel bağımlılık olmasın diye);
 * çağıran taraf bileşenlerdir.
 */
export function resetLiveStores() {
  useCutListStore.getState().setCutLists([]);
  useCutDialogStore.setState({
    cutDialog: null,
    currentCutDialog: null,
    isModalOpen: false,
  });
  useCutSettingStore.getState().clear();
}
