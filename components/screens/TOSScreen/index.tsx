import React from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";

const TOSScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>916 Run Club Terms of Service</Text>

      <Text style={styles.sectionTitle}>1. Introduction</Text>
      <Text style={styles.paragraph}>
        Welcome to 916 Run Club! By accessing or using our mobile application,
        you agree to comply with and be bound by these Terms of Service
        ("Terms"). If you do not agree to these Terms, please do not use the
        app.
      </Text>

      <Text style={styles.sectionTitle}>2. Eligibility</Text>
      <Text style={styles.paragraph}>
        The 916 Run Club app is available to users who are 18 years of age or
        older. By using the app, you confirm that you meet this age requirement.
      </Text>

      <Text style={styles.sectionTitle}>3. Account Registration</Text>
      <Text style={styles.paragraph}>
        To use certain features of the app, such as signing in to events or
        contributing content, you must create an account. You agree to provide
        accurate and complete information during the registration process.
      </Text>

      <Text style={styles.sectionTitle}>
        4. User Conduct and Community Guidelines
      </Text>
      <Text style={styles.paragraph}>
        As part of our community, users are expected to follow the Run Club
        Rules. Violations may result in suspension or termination of your
        account.
      </Text>
      <Text style={styles.paragraph}>- Be kind and respectful</Text>
      <Text style={styles.paragraph}>- Share responsibly</Text>
      <Text style={styles.paragraph}>- Run with integrity</Text>
      <Text style={styles.paragraph}>- Safety first</Text>

      <Text style={styles.sectionTitle}>5. Content Sharing</Text>
      <Text style={styles.paragraph}>
        Users are allowed to share content such as photos and posts within the
        community. By sharing, you grant 916 Run Club a license to display and
        share your content within the app. However, you retain full ownership of
        any content you post.
      </Text>

      <Text style={styles.sectionTitle}>6. Data Collection and Use</Text>
      <Text style={styles.paragraph}>
        We collect email information for the purposes of building an email list
        for event updates, newsletters, and other communications related to 916
        Run Club. This data is stored securely using MongoDB. We will not share
        your data with any third-party services.
      </Text>

      <Text style={styles.sectionTitle}>7. Third-Party Integration</Text>
      <Text style={styles.paragraph}>
        916 Run Club integrates with Instagram to enhance user experience.
        However, we do not share or sell any user data to third-party services.
      </Text>

      <Text style={styles.sectionTitle}>8. Disclaimer of Liability</Text>
      <Text style={styles.paragraph}>
        916 Run Club is not liable for any injuries, accidents, or damages that
        occur outside the use of the app, including during events organized
        through the app. Users participate in all events at their own risk.
      </Text>

      <Text style={styles.sectionTitle}>9. Updates to Terms</Text>
      <Text style={styles.paragraph}>
        We may update these Terms of Service from time to time. Users will be
        notified of any changes, but your continued use of the app after such
        changes signifies your acceptance of the updated Terms.
      </Text>

      <Text style={styles.sectionTitle}>10. Termination of Service</Text>
      <Text style={styles.paragraph}>
        We reserve the right to suspend or terminate your access to the app if
        you violate these Terms or engage in harmful or illegal activity within
        the community.
      </Text>

      <Text style={styles.sectionTitle}>11. Governing Law</Text>
      <Text style={styles.paragraph}>
        These Terms are governed by the laws of the state of California. Any
        disputes arising from these Terms or the use of the app will be resolved
        under California jurisdiction.
      </Text>

      <Text style={styles.header}>916 Run Club Community Rules</Text>

      <Text style={styles.paragraph}>
        As part of the 916 Run Club community, we ask that all members adhere to
        the following rules to ensure a welcoming and respectful environment for
        everyone:
      </Text>
      <Text style={styles.paragraph}>1. Be Kind and Respectful</Text>
      <Text style={styles.paragraph}>
        Treat all members of the community with respect. Harassment, bullying,
        or discrimination of any kind will not be tolerated.
      </Text>
      <Text style={styles.paragraph}>2. Share Positively</Text>
      <Text style={styles.paragraph}>
        Content shared within the app should contribute to the positive spirit
        of the club. Avoid posting harmful, illegal, or inappropriate material.
      </Text>
      <Text style={styles.paragraph}>3. Support One Another</Text>
      <Text style={styles.paragraph}>
        The Run Club is a community. Encourage your fellow runners and support
        each other both in the app and at events.
      </Text>
      <Text style={styles.paragraph}>4. Safety First</Text>
      <Text style={styles.paragraph}>
        Always prioritize safety, whether during runs or when sharing advice. We
        encourage you to follow local health and safety guidelines during
        events.
      </Text>
      <Text style={styles.paragraph}>5. Be Honest and Fair</Text>
      <Text style={styles.paragraph}>
        We ask that all members participate honestly in any activities, events,
        or vibe point distributions. Cheating or manipulating the system is
        discouraged.
      </Text>
      <Text style={styles.paragraph}>6. Protect Personal Data</Text>
      <Text style={styles.paragraph}>
        Respect the privacy of others. Do not share personal information of
        other members without their permission.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
});

export default TOSScreen;
