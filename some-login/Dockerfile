FROM openjdk:11-jdk
ARG JAR_FILE=build/libs/*.jar

EXPOSE 8080

# Set the timezone to Korea
RUN apt-get update && \
    apt-get install -y tzdata && \
    ln -fs /usr/share/zoneinfo/Asia/Seoul /etc/localtime && \
    dpkg-reconfigure --frontend noninteractive tzdata

COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
