import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dataset from "./components/Dataset";
import "./discover.scss";
import medicalImaging from "./assets/medical_imaging.png";
import satelliteImagery from "./assets/satellite_and_areal.png";
import autonomousDriving from "./assets/autonomous_driving.png";
import abstractArt from "./assets/abstract_art.png";
import africanWildlife from "./assets/african_wildlife.png";
import asianPeople from "./assets/asian_people.png";
import { Satellite } from "lucide-react";

const Discover = () => {
  const [datasetIDs, setDatasetIDs] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDatasetIDs = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/datasets/getDatasetIDs/6"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch dataset IDs");
        }
        const data = await response.json();
        console.log("Fetched dataset IDs:", data);
        setDatasetIDs(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchDatasetIDs();
  }, []);

  useEffect(() => {
    const fetchDatasetDetails = async () => {
      try {
        // Fetch details for each dataset in parallel
        const datasetPromises = datasetIDs.map(async (id) => {
          // Fetch dataset information
          const infoResponse = await fetch(
            `http://localhost:8080/datasets/getDatasetInformation/${id}`
          );
          if (!infoResponse.ok) {
            throw new Error(`Failed to fetch dataset info for ID: ${id}`);
          }
          const infoData = await infoResponse.json();

          // Fetch the preview image (using index 0 as the default)
          const imageResponse = await fetch(
            `http://localhost:8080/datasets/getDatasetSinglePreviewImage/${id}/0`
          );
          if (!imageResponse.ok) {
            throw new Error(`Failed to fetch dataset image for ID: ${id}`);
          }
          const imageBlob = await imageResponse.blob();
          const imageURL = URL.createObjectURL(imageBlob);

          return {
            id,
            title: infoData.name,
            price: infoData.price,
            image: imageURL,
          };
        });

        // Resolve all promises and update the datasets state
        const fetchedDatasets = await Promise.all(datasetPromises);
        setDatasets(fetchedDatasets);
        console.log(fetchedDatasets);
      } catch (error) {
        setError(error.message);
      }
    };

    if (datasetIDs.length > 0) {
      fetchDatasetDetails();
    }
  }, [datasetIDs]);

  const firstRow = datasets.slice(0, 3);
  const secondRow = datasets.slice(3, 6);

  //   return (
  //     <div className="discover">
  //       <Navbar />
  //       <div className="main">
  //         <p className="header">Explore our starter kit</p>
  //         <div className="pictures">
  //           <div className="row-of-pictures">
  //             {firstRow.map((dataset) => (
  //               <Dataset
  //                 key={dataset.id}
  //                 image={dataset.image}
  //                 description={dataset.title}
  //                 price={`$${dataset.price} per month`}
  //               />
  //             ))}
  //           </div>
  //           <div className="row-of-pictures">
  //             {secondRow.map((dataset) => (
  //               <Dataset
  //                 key={dataset.id}
  //                 image={dataset.image}
  //                 description={dataset.title}
  //                 price={`$${dataset.price} per month`}
  //               />
  //             ))}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <div className="discover">
      <Navbar />
      <div className="main">
        <p className="header">Explore our starter kit</p>
        <div className="pictures">
          <div className="row-of-pictures">
            {firstRow.map((dataset) => (
              <Link
                to={`/dataset/${dataset.id}`}
                key={dataset.id}
                state={{
                  title: dataset.title,
                  price: dataset.price,
                  image: dataset.image,
                }}
              >
                <Dataset
                  image={dataset.image}
                  description={dataset.title}
                  price={`$${dataset.price} per month`}
                />
              </Link>
            ))}
          </div>
          <div className="row-of-pictures">
            {secondRow.map((dataset) => (
              <Link
                to={`/dataset/${dataset.id}`}
                key={dataset.id}
                state={{
                  title: dataset.title,
                  price: dataset.price,
                  image: dataset.image,
                }}
              >
                <Dataset
                  image={dataset.image}
                  description={dataset.title}
                  price={`$${dataset.price} per month`}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discover;
