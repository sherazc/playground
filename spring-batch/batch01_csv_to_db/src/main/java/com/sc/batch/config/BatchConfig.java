package com.sc.batch.config;

import com.sc.batch.model.User;
import com.sc.batch.services.UserItemProcessor;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.database.BeanPropertyItemSqlParameterSourceProvider;
import org.springframework.batch.item.database.builder.JdbcBatchItemWriterBuilder;
import org.springframework.batch.item.file.FlatFileItemReader;
import org.springframework.batch.item.file.builder.FlatFileItemReaderBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;

@Configuration
@EnableBatchProcessing
public class BatchConfig {

  @Bean
  public FlatFileItemReader<User> reader() {
    return new FlatFileItemReaderBuilder<User>()
        .name("userItemReader")
        .resource(new ClassPathResource("users.csv"))
        .delimited()
        .names("firstName", "lastName", "email")
        .build();
  }

  @Bean
  public ItemProcessor<User, User> processor() {
    return new UserItemProcessor();
  }

  @Bean
  public ItemWriter<User> writer(DataSource dataSource) {
    return new JdbcBatchItemWriterBuilder<User>()
        .itemSqlParameterSourceProvider(new BeanPropertyItemSqlParameterSourceProvider<>())
        .sql("INSERT INTO users (first_name, last_name, email) VALUES (:firstName, :lastName, :email)")
        .dataSource(dataSource)
        .build();
  }



  @Bean
  public Job job(JobRepository jobRepository, Step step) {
    return new JobBuilder("importantJob", jobRepository)
        .start(step)
        .build();
  }

  @Bean
  public Step step(
      JobRepository jobRepository,
      PlatformTransactionManager transactionManager,
      ItemReader<User> reader,
      ItemProcessor<User, User> processor,
      ItemWriter<User> writer) {

    return new StepBuilder("step1", jobRepository)
        .<User, User>chunk(10, transactionManager)
        .reader(reader)
        .processor(processor)
        .writer(writer)
        .build();
  }

}
