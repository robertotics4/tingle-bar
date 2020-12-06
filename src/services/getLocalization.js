import Geocode from 'react-geocode';

Geocode.setApiKey('AIzaSyA0nhjU9DK9Pog_HEJ_wAmqq5gejqPtKks');
Geocode.setLanguage("pt-BR");
Geocode.setRegion("br");
Geocode.enableDebug();


async function getLocalization(address) {
  try {
    const response = await Geocode.fromAddress(address);
    const { lat, lng } = response.results[0].geometry.location;

    return { lat, lng };
  } catch (err) {
    return null;
  }
}

export default getLocalization;

