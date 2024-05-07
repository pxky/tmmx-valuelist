const dataUrl = "https://gist.githubusercontent.com/pxky/92cca30a1e5c48af3fbcbeeb0e52dc0f/raw/0d4e835eae864ab7b6253308d3233259e886a1c1/TMMX-VALUES.json";
const settingsUrl = "https://gist.githubusercontent.com/pxky/baf42d0d0b6fa692e78e052b5e6105b5/raw/06ad179b8b17ac2af3a20bb2906dfaac61723bf6/TMMX-VALUES-SETTINGS.json";
const corsProxyUrl = "https://api.allorigins.win/raw?url=";

const GetData = async (url) => {
  let data = [];
  try {
    const response = await fetch(corsProxyUrl + url, { method: "GET" });
    if (!response.ok) {
      throw new Error(`HTTP error status: ${response.status}`);
    }
    const resData = await response.text();
    data = JSON.parse(resData);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  return data;
};

const SortDataByKey = (data, key, settingData) => {
  const groupedData = data.reduce((acc, item) => {
    const grouping = item[key];
    let category = item["GroupName"];
    if (!acc[grouping]) {
      acc[grouping] = {};
    }
    if (!acc[grouping][category]) {
      acc[grouping][category] = [];
    }
    acc[grouping][category].push(item);
    return acc;
  }, {});

  return Object.keys(groupedData).map(grouping => ({
    title: grouping,
    displayOrder: settingData.TierDisplayOrder[grouping],
    categories: Object.keys(groupedData[grouping]).map(category => ({
      title: category,
      items: groupedData[grouping][category]
    })).sort((a, b) => {
      const orderA = settingData.CategoryDisplayOrder[a.title] || 100;
      const orderB = settingData.CategoryDisplayOrder[b.title] || 100;
      return orderA - orderB;
    })
  })).sort((a, b) => {
    const orderA = settingData.TierDisplayOrder[a.title] || 100;
    const orderB = settingData.TierDisplayOrder[b.title] || 100;
    return orderA - orderB;
  });
};

const processData = async () => {
  try {
    const valueData = await GetData(dataUrl);
    const settingData = await GetData(settingsUrl);
    const SortedData = SortDataByKey(valueData, "QualityName", settingData);
    return { 
      ValueData: valueData,
      SortedData: SortedData, 
      SettingData: settingData, 
    };
  } catch (error) {
    alert('Failed to load data:', error);
    throw error;
  }
};

module.exports = {
  processData
};
