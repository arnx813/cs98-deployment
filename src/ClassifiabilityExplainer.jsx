import React from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import Navbar from "./components/Navbar";

const ClassifiabilityExplainer = () => {
  return (
    <MathJaxContext>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <Navbar />
        <div className="max-w-3xl mx-auto py-10 px-6">
          <h1 className="text-3xl font-bold mb-6">
            Determining Dataset Classifiability
          </h1>

          <p className="mb-4">
            One of the differentiating features of our marketplace is that we
            created a novel, inexpenseive and fast approach to predicting how
            classifiable a dataset is based on the uploaded images in the
            dataset. Instead of training and fine-tuning a whole model in order
            to verify test accuracy on the dataset, we instead use feature
            extraction to tokenize each image. With these tokenized features, we
            are able gage intra-class similarity, which can give us a
            generalized perspective on how congruent the images are within their
            own class.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">
            Mathematical Formulation
          </h2>
          <p className="mb-4">
            To quantify classifiability, we wanted to use a simplistic 0 to 100
            scale for easy readibility for users. We start by analyzing each
            class in the dataset individually (note that this works beyond
            binary classifiers). Given a class, we take all the images and
            preprocess them in order to extract their features (224x224 pixels,
            RGB conversion, traditional numpy preprocessing). We used a
            pre-trained feature extraction model, deployed using ONNX Runtime,
            to extract the features from the images. An average feature was then
            obtained from the class:
          </p>

          <MathJax className="mb-6 text-lg">
            {"features = np.array(features)"}
          </MathJax>

          <MathJax className="mb-6 text-lg">
            {"feature_avg = np.mean(features, axis=0)"}
          </MathJax>

          <p className="mb-4">
            We use an axis of 0 to get a single-column vector that represents
            the average feature vector of the class. In other words, imagine
            flattening all the images of a class into one image, and taking the
            average pixel value per pixel in that new image; that is essentially
            what we end up with.
          </p>

          <p className="mb-4">
            Now that we have our average feature vector, we want to return to
            our original problem, which was gaging classifiability amongst the
            whole dataset. Given the assumption that, the more congruent each
            class if within itself, the better the overall dataset will be at
            classifying, we can use the average feature vector of the class to
            determine how similar all the images in the class are to the
            average. We can do this by computing a <b>loss function</b> for the
            class, and seeing how large or small our cost value is. By doing
            this, we can figure out the average intra-class variance to get a
            better metric and how decent all the classes in the dataset are.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">Loss Function</h2>
          <p className="mb-4">
            Given our average feature vector from above, we can go through every
            feature in our "features" array and see how far it is from the
            average. We flatten the vector to get a single integer value for the
            loss, square it so that it is positive, and sum all these values to
            get the cost value. We use Mean Squared Error instead of the Mean
            Absolute Deviation because, assuming benevolence of the uploader and
            trying to upload a valid, classifiable dataset, there ideally will
            be no massive outliers that would drive our squared value through
            the roof. Hence, we decided we could stick with it.
          </p>

          {/* <MathJax className="mb-6 text-lg">
            {"$$S = \frac{1}{1 + e^{-C}}$$"}
          </MathJax> */}

          <MathJax className="mb-6 text-lg">
            {
              "$$\\text{loss} = \\sum (\\text{features} - \\text{feature_avg})^2$$"
            }
          </MathJax>
          <MathJax className="mb-6 text-lg">
            {
              "$$\\text{avg_loss} = \\frac{\\text{loss}}{\\text{len(features)}}$$"
            }
          </MathJax>

          <p className="mb-4">
            This gives us the average loss per feature (we will explain why we
            use average loss per feature instead of the given cost value later).
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">Conclusion</h2>
          <p>
            The final algorithm successfully estimates how well a dataset can be
            classified. Future improvements include refining distance functions
            and testing with more complex feature distributions.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">
            Known Limitations
          </h2>
          <p>
            We understand the determining classifiability by simply using
            intra-class similarity is a shortcoming. Although it does an alright
            job at determining how similar a class is to itself, it is important
            to note that great datasets utilize as much diverse data on a
            certain class as they can in order to be able to capture as much
            variance as they can in a certain class. Hence, having a class that
            deviates heavily from the average feature vector is not necessarily
            an indication of poor performance or classifiability. Additionally,
            if we wanted a much better scale of classifiability within a
            dataset, we would want to compute the ratio of intra-class variance
            to inter-class variance; that is, the ratio of how similar classes
            are within themselves versus how different they are from each other
            in a dataset. Given this ratio, we would want very a small value,
            indicating low variance within classes and high variance between
            them. This would show that classes are very similar to themselves,
            but can be easily differentiated from other classes. However, to
            determine what would be a good and bad ratio, we would need data
            outside of dataset, or historical data, indicating the average
            difference between two classes in other datasets with the same
            classes. Besides being much more expensive to determine (would
            involve storing much larger and much more datasets on our AWS
            backend), this would be outside the scope of our project.
          </p>
        </div>
      </div>
    </MathJaxContext>
  );
};

export default ClassifiabilityExplainer;
