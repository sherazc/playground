package com.sc.cdb.config

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.stereotype.Component

@Component
@ConfigurationProperties(value = "cdb")
data class AppConfiguration(
    var email: EmailConfig = EmailConfig(),
    var s3: S3Config = S3Config()
)

data class EmailConfig(var enable: Boolean = false)

data class S3Config(
    var region: String = "",
    // For client files like logo and flyers
    var clientBucketName: String = "",
    // For server files like db backups
    var serverBucketName: String = ""
)