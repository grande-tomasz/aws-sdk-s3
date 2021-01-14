import {
  Bucket,
  GetObjectCommand,
  GetObjectCommandInput,
  ListBucketsCommand,
  ListObjectsCommand,
  S3Client,
} from "@aws-sdk/client-s3";

require("dotenv").config();

const region = "us-east-1";
const s3Client = new S3Client({ region });

const getBucketObject = async (
  Bucket: Bucket["Name"],
  Key: GetObjectCommandInput["Key"]
) => {
  try {
    const s3BucketObject = await s3Client.send(
      new GetObjectCommand({ Bucket, Key })
    );
    console.log("AWS S3 Bucket Object:", s3BucketObject);
  } catch (error) {
    console.log("error", error);
  }
};

const listBucketObjects = async (Bucket: Bucket["Name"]) => {
  try {
    const s3BucketObjects = await s3Client.send(
      new ListObjectsCommand({ Bucket })
    );
    console.log("AWS S3 Bucket:", Bucket);
    console.log("AWS S3 Bucket Objects:", s3BucketObjects);

    s3BucketObjects.Contents.forEach((BucketObject) =>
      getBucketObject(Bucket, BucketObject.Key)
    );
  } catch (error) {
    console.log("error", error);
  }
};

const listBucketsData = async () => {
  try {
    const s3Buckets = await s3Client.send(new ListBucketsCommand({}));
    console.log("AWS S3 Buckets:", s3Buckets);

    s3Buckets.Buckets.forEach((Bucket) => listBucketObjects(Bucket.Name));
  } catch (error) {
    console.log("error", error);
  }
};

listBucketsData();
