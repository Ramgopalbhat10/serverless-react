import * as AWS from 'aws-sdk'
import { AWSError } from 'aws-sdk';
import { CreateTableInput, CreateTableOutput } from 'aws-sdk/clients/dynamodb';

AWS.config.update({
  region: 'us-east-1'
})

var dynamoDB = new AWS.DynamoDB()

var params: CreateTableInput = {
  TableName : "Games",
  KeySchema: [       
      { AttributeName: "genre", KeyType: "HASH"},  
      { AttributeName: "title", KeyType: "RANGE" } 
  ],
  AttributeDefinitions: [       
      { AttributeName: "genre", AttributeType: "N" },
      { AttributeName: "title", AttributeType: "S" }
  ],
  ProvisionedThroughput: {       
      ReadCapacityUnits: 10, 
      WriteCapacityUnits: 10
  }
};

dynamoDB.createTable(params, function(err: AWSError, data: CreateTableOutput) {
  if(err) {
    console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
  } else {
    console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
  }
})