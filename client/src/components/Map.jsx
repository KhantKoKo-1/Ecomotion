// import "maplibre-gl/dist/maplibre-gl.css";
// import maplibregl from "maplibre-gl";
// import ReactMapGL from "react-map-gl";

// function Map() {
  
//   return (
//     <ReactMapGL
//       mapLib={maplibregl}
//       maxBounds={[103.596, 1.1443, 104.1, 1.4835]}
//       mapStyle={{
//         // https://maps-json.onemap.sg/Default.json
//         version: 8,
//         name: "Default",
//         sources: {
//           Default: {
//             type: "raster",
//             tiles: [
//               "https://maps-a.onemap.sg/v3/Default_HD/{z}/{x}/{y}.png?fresh=true",
//               "https://maps-b.onemap.sg/v3/Default_HD/{z}/{x}/{y}.png?fresh=true",
//               "https://maps-c.onemap.sg/v3/Default_HD/{z}/{x}/{y}.png?fresh=true",
//             ],
//             tileSize: 128,
//             bounds: [103.596, 1.1443, 104.4309, 1.4835],
//           },
//         },
//         layers: [
//           {
//             id: "Default",
//             type: "raster",
//             source: "Default",
//           },
//         ],
//       }}
//       style={{
//         width: "100vw",
//         height: "100vh",
//       }}
//     />
//   )
// }

// export default Map

import "maplibre-gl/dist/maplibre-gl.css";
import maplibregl from "maplibre-gl";
import ReactMapGL from "react-map-gl";
import axios from "axios";

function Map() {
  const email = 'bgeethaharini@onemap.sg';
  const password = 'EcoMotion123';

  const getToken = async () => {
    try {
      const response = await axios.post(
        'https://developers.onemap.sg/privateapi/auth/post/getToken',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  getToken();

  return (
    <ReactMapGL
      mapLib={maplibregl}
      maxBounds={[103.596, 1.1443, 104.1, 1.4835]}
      mapStyle={{
        // https://maps-json.onemap.sg/Default.json
        version: 8,
        name: "Default",
        sources: {
          Default: {
            type: "raster",
            tiles: [
              "https://maps-a.onemap.sg/v3/Default_HD/{z}/{x}/{y}.png?fresh=true",
              "https://maps-b.onemap.sg/v3/Default_HD/{z}/{x}/{y}.png?fresh=true",
              "https://maps-c.onemap.sg/v3/Default_HD/{z}/{x}/{y}.png?fresh=true",
            ],
            tileSize: 128,
            bounds: [103.596, 1.1443, 104.4309, 1.4835],
          },
        },
        layers: [
          {
            id: "Default",
            type: "raster",
            source: "Default",
          },
        ],
      }}
      style={{
        width: "100vw",
        height: "100vh",
      }}
    />
  );
}

export default Map;
