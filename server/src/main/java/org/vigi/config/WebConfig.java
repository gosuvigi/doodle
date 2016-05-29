package org.vigi.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.resource.ResourceUrlEncodingFilter;
import org.springframework.web.servlet.resource.VersionResourceResolver;

import java.io.File;

@Configuration
class WebConfig extends WebMvcConfigurerAdapter {

    @Autowired
    private Environment env;

    @Value("${last.build.date:now}")
    private String lastBuildDate;

    @Bean
    public ResourceUrlEncodingFilter resourceUrlEncodingFilter() {
        return new ResourceUrlEncodingFilter();
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        boolean devMode = env.acceptsProfiles("embedded") || env.acceptsProfiles("default");
        Integer cachePeriodSeconds = devMode ? 0 : null;
        boolean useResourceCache = !devMode;
        String version = getApplicationVersion();

//        AppCacheManifestTransformer appCacheTransformer = new AppCacheManifestTransformer();
        VersionResourceResolver versionResolver = new VersionResourceResolver()
                .addFixedVersionStrategy(version, "/**/*.js", "/**/*.map")
                .addContentVersionStrategy("/**");

        String resourceLocations = getStaticResourceLocations();
        registry.addResourceHandler("/**")
                .addResourceLocations(resourceLocations)
                .setCachePeriod(cachePeriodSeconds)
                .resourceChain(useResourceCache)
                .addResolver(versionResolver);
//                .addTransformer(appCacheTransformer);
    }

    private String getStaticResourceLocations() {
        if (env.acceptsProfiles("embedded")) {
            String currentPath = new File(".").getAbsolutePath();
            return "file:///" + currentPath + "/client/";
        } else if (env.acceptsProfiles("prod")) {
            return "classpath:static/";
        }

        // default profile with Tomcat server running from IDE
        return "classpath:/";
    }

    protected String getApplicationVersion() {
        return this.env.acceptsProfiles("development") ? "dev" : this.lastBuildDate;
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        super.addViewControllers(registry);
        registry.addViewController("/login").setViewName("login");
    }
}
