import { useLoading } from 'vue-loading-overlay'
import { ref, onBeforeMount, inject } from "vue"

export const useHelper = () => {
    const $loading = useLoading();
    var loader = null;

    const showLoading = async (container = null, modal = false) => {
        if (!loader) {
            loader = $loading.show({
                container: container,
                color: '#0d6efd',
            });
            if (!modal) {
                document.documentElement.style.overflow = 'hidden';
            }
        }
    }
    const hideLoading = async (modal = false) => {
        if (loader) {
            await loader.hide();
            loader = null; 
        }
        if (!modal) {
            document.documentElement.style.removeProperty('overflow');
        }
    }

    return {
       
        showLoading,
        hideLoading,
       
    }

}