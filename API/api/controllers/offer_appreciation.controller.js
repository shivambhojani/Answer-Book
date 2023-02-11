/**
 * @author aman singh bhandari
 */
import { offer_appreciationService } from "../services/index.js";

const updateAppreciation = async (req, res) => {
  const post = req.body; //offer appreciaition payload
  try {
    await offer_appreciationService.updateAppreciation(post);

    res.status(200).json({
      message: "ok",
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Get a appreciaiton based on the userid
const getAppreciation = async (req, res) => {
  //userid
  try {
    const score_offered = await offer_appreciationService.getAppreciation(); //get the offered appreciaiton

    res.status(200).json({
      message: "ok",
      score_offered,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const offer_appreciationController = {
  updateAppreciation,
  getAppreciation,
};
