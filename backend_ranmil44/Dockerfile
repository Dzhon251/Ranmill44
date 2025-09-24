#Build
FROM openjdk:21-slim AS build
LABEL maintainer="MARCO RIVAS"
LABEL version="1.0"
LABEL description="Sistema Declaración de historial de personal - DHP"
WORKDIR /app
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./
RUN chmod +x mvnw
RUN ./mvnw -q dependency:go-offline -B

COPY src src
RUN ./mvnw -q package -DskipTests -B

#Package
FROM openjdk:21-slim
LABEL maintainer="MARCO RIVAS"
COPY --from=build /app/target/mcsv-dimt-dhp-0.0.1-SNAPSHOT.jar /usr/local/lib/mcsv-dimt-dhp.jar
ENTRYPOINT ["sh", "-c","keytool -importcert -file /tmp/${NOMBRE_CERTIFICADO} -keystore /usr/local/openjdk-21/lib/security/cacerts -trustcacerts -storepass changeit --noprompt && java -Duser.timezone=UTC -jar /usr/local/lib/mcsv-dimt-dhp.jar"]
