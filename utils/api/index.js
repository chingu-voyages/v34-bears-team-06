import axios from "axios";

const RESIDENT_URI = "/api/resident/";
const MENU_URI = "/api/menu/";

export async function updateResident(residentId, residentData) {
  let response = {};
  try {
    response = await axios.put(RESIDENT_URI + residentId, residentData, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    console.log("[API][updateResident] Success");
  } catch (err) {
    console.log("[API][updateResident] error:", err);
    response.error = err;
  } finally {
    return response.data;
  }
}

export async function getResidents(params = {}) {
  let response = {};
  try {
    response = await axios.get(RESIDENT_URI, {
      params,
    });
    console.log("[API][getResidents] Success");
  } catch (err) {
    console.log("[API][getResidents] error:", err);
    response.error = err;
  } finally {
    return response.data.resident;
  }
}

export async function getMenus(params = {}) {
  let response = {};
  try {
    response = await axios.get(MENU_URI, {
      params,
    });
    console.log("[API][getMenus] Success");
  } catch (err) {
    console.log("[API][getMenus] error:", err);
    response.error = err;
  } finally {
    return response.data.menus;
  }
}
