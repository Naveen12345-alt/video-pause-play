export const getVideo = async () => {
  const URL =
    "https://gist.githubusercontent.com/poudyalanil/ca84582cbeb4fc123a13290a586da925/raw/14a27bd0bcd0cd323b35ad79cf3b493dddf6216b/videos.json";

  try {
    const response = await fetch(URL);
    const json = await response.json();
    return { type: "success", data: json };
  } catch (error) {
    return { type: "error", data: JSON.stringify(error) };
  }
};
