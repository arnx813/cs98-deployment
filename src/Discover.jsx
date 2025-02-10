import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dataset from "./components/Dataset";
import Footer from "./components/Footer";
// import { Authenticator, withAuthenticator } from "@aws-amplify/ui-react";
// import "@aws-amplify/ui-react/styles.css";

const Discover = () => {
  const [datasetIDs, setDatasetIDs] = useState([]);
  const [allDatasetIDs, setAllDatasetIDs] = useState([]);

  const [datasets, setDatasets] = useState([]);
  const [allDatasets, setAllDatasets] = useState([]);

  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Placeholder datasets
  const placeholderDatasets = [
    {
      id: 1,
      title: "Placeholder Dataset 1",
      price: "Free",
      description: "This is a placeholder description for dataset 1.",
    },
    {
      id: 2,
      title: "Placeholder Dataset 2",
      price: "$10/month",
      description: "This is a placeholder description for dataset 2.",
    },
    {
      id: 3,
      title: "Placeholder Dataset 3",
      price: "$20/month",
      description: "This is a placeholder description for dataset 3.",
    },
    {
      id: 1,
      title: "Placeholder Dataset 1",
      price: "Free",
      description: "This is a placeholder description for dataset 1.",
    },
    {
      id: 2,
      title: "Placeholder Dataset 2",
      price: "$10/month",
      description: "This is a placeholder description for dataset 2.",
    },
    {
      id: 3,
      title: "Placeholder Dataset 3",
      price: "$20/month",
      description: "This is a placeholder description for dataset 3.",
    },
    {
      id: 1,
      title: "Placeholder Dataset 1",
      price: "Free",
      description: "This is a placeholder description for dataset 1.",
    },
    {
      id: 2,
      title: "Placeholder Dataset 2",
      price: "$10/month",
      description: "This is a placeholder description for dataset 2.",
    },
    {
      id: 3,
      title: "Placeholder Dataset 3",
      price: "$20/month",
      description: "This is a placeholder description for dataset 3.",
    },
  ];

  useEffect(() => {
    const fetchDatasetIDs = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/public/datasets/getRandomDatasetIDs/6"
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
    const fetchAllDatasetIDs = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/public/datasets/getAllDatasetIDs"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch all dataset IDs");
        }
        const data = await response.json();
        console.log("Fetched all dataset IDs:", data);
        setAllDatasetIDs(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchAllDatasetIDs();
  }, []);

  useEffect(() => {
    const fetchDatasetDetails = async () => {
      try {
        // Fetch details for each dataset in parallel
        const datasetPromises = datasetIDs.map(async (id) => {
          // Fetch dataset information
          const infoResponse = await fetch(
            `http://localhost:8080/api/public/datasets/getDatasetInformation/${id}`
          );
          if (!infoResponse.ok) {
            throw new Error(`Failed to fetch dataset info for ID: ${id}`);
          }
          const infoData = await infoResponse.json();

          // Fetch the preview image (using index 0 as the default)
          const imageResponse = await fetch(
            `http://localhost:8080/api/public/datasets/getDatasetSinglePreviewImage/${id}`
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
            description: infoData.description,
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

  useEffect(() => {
    const fetchAllDatasetDetails = async () => {
      try {
        const datasetPromises = allDatasetIDs.map(async (id) => {
          console.log("the id is ", id);

          const infoResponse = await fetch(
            `http://localhost:8080/api/public/datasets/getDatasetInformation/${id}`
          );
          if (!infoResponse.ok) {
            throw new Error(`Failed to fetch dataset info for ID: ${id}`);
          }
          const infoData = await infoResponse.json();
          console.log("info data", infoData);

          const imageResponse = await fetch(
            `http://localhost:8080/api/public/datasets/getDatasetSinglePreviewImage/${id}`
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
            description: infoData.description,
          };
        });

        const fetchedDatasets = await Promise.all(datasetPromises);
        setAllDatasets(fetchedDatasets);
        console.log("asdfasf", fetchedDatasets);
      } catch (error) {
        setError(error.message);
      }
    };

    if (allDatasetIDs.length > 0) {
      fetchAllDatasetDetails();
    }
  }, [allDatasetIDs]);

  return (
    <div className="p-4">
      <Navbar />
      <div className="text-center my-6">
        <p className="text-4xl">Explore our starter kit</p>
      </div>
      <div className="max-w-screen-3xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {datasets.map((dataset) => (
            <Link
              to={`/dataset/${dataset.id}`}
              key={dataset.id}
              state={{
                id: dataset.id,
                title: dataset.title,
                price: dataset.price,
                image: dataset.image,
                description: dataset.description,
              }}
              className="block"
            >
              <Dataset
                image={dataset.image}
                description={dataset.title}
                price={`$${dataset.price} per month`}
              />
            </Link>
          ))}
        </div>
        <hr className="my-8 border-gray-300" />

        {/* View all datasets section */}
        <div className="my-6">
          <p className="text-lg mb-4">View all datasets</p>
          <div className="space-y-4">
            {allDatasets.map((dataset) => (
              <Link
                to={`/dataset/${dataset.id}`}
                key={dataset.id}
                className="block w-full"
                state={{
                  id: dataset.id,
                  title: dataset.title,
                  price: dataset.price,
                  image: dataset.image,
                  description: dataset.description,
                }}
              >
                <div className="w-full border border-gray-200 rounded-lg p-4 flex items-center space-x-4 hover:bg-gray-100 transition">
                  {/* Image */}
                  {dataset.image && (
                    <img
                      src={dataset.image}
                      alt={dataset.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  )}
                  {/* Text Content */}
                  <div>
                    <p className="text-lg font-semibold">{dataset.title}</p>
                    <p className="text-sm text-gray-600">
                      {dataset.description}
                    </p>
                    <p className="text-sm text-gray-800 font-medium">
                      ${dataset.price}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discover;
