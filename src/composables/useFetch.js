import { ref } from "vue";
import { useToast } from "vue-toast-notification";

const useFetch = () => {
  const error = ref(null);
  const $toast = useToast({ position: "top-right" });

  const fetchData = async ({ url, method = "GET", data = null }) => {
    error.value = null;

    try {
      const response = await fetch(url, {
        method,
        body: data && JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (!response.ok) {
        throw new Error(response.status);
      }
      switch (method) {
        case "POST":
          $toast.success("新增成功");
          break;
        case "PATCH":
          $toast.success("修改成功");
          break;
        case "DELETE":
          $toast.success("刪除成功");
          break;
        default:
          break;
      }
      return await response.json();
    } catch (e) {
      error.value = e;
      if (e.message === "404") {
        $toast.error("查無資料");
      } else {
        $toast.error("發生錯誤，請稍候再重試");
      }
    }
  };

  return {
    error,
    fetchData,
  };
};

export default useFetch;
