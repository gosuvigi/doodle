package org.springframework.samples.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.http.MediaType;
import org.springframework.web.servlet.config.annotation.ContentNegotiationConfigurer;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.resource.AppCacheManifestTransformer;
import org.springframework.web.servlet.resource.ResourceUrlEncodingFilter;
import org.springframework.web.servlet.resource.VersionResourceResolver;

import java.io.File;

@Configuration
public class WebConfig extends WebMvcConfigurerAdapter {

    @Autowired
    private Environment env;

    @Value("${resources.projectroot:}")
    private String projectRoot;

    @Value("${app.version:}")
    private String appVersion;

    @Override
    public void configureContentNegotiation(final ContentNegotiationConfigurer configurer) {
        super.configureContentNegotiation(configurer);
        configurer.mediaType("js.map", MediaType.APPLICATION_JSON);
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("index");
        registry.addViewController("/groovy").setViewName("hello");
        registry.addViewController("/app").setViewName("app");
        registry.addViewController("/less").setViewName("less");
        registry.addViewController("/jsp").setViewName("hellojsp");
    }

    @Bean
    public ResourceUrlEncodingFilter resourceUrlEncodingFilter() {
        return new ResourceUrlEncodingFilter();
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        boolean devMode = this.env.acceptsProfiles("development");
        String location;
        if (devMode) {
            String currentPath = new File(".").getAbsolutePath();
            location = "file:///" + currentPath + "/client/src/";
        } else {
            location = "classpath:static/";
        }

        Integer cachePeriod = devMode ? 0 : null;
        boolean useResourceCache = !devMode;
        String version = getApplicationVersion();

        AppCacheManifestTransformer appCacheTransformer = new AppCacheManifestTransformer();
        VersionResourceResolver versionResolver = new VersionResourceResolver()
                .addFixedVersionStrategy(version, "/**/*.js", "/**/*.map")
                .addContentVersionStrategy("/**");

        registry.addResourceHandler("/**")
                .addResourceLocations(location)
                .setCachePeriod(cachePeriod)
                .resourceChain(useResourceCache)
                .addResolver(versionResolver)
                .addTransformer(appCacheTransformer);
    }

    protected String getApplicationVersion() {
        return this.env.acceptsProfiles("development") ? "dev" : this.appVersion;
    }

}
