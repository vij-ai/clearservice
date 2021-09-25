import React from "react";
import { TextInput, Button, Title } from "react-native-paper";
import { View, Text, StyleSheet, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

// const FIREBASE_REF_USERS = firebaseService.database().ref("Users");

export default function Terms({ navigation }) {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Title style={styles.titleText}>Terms of service </Title>
        <Text>
          Celsius Terms of Service 1. Terms By accessing our app, Celsius, you
          are agreeing to be bound by these terms of service, all applicable
          laws and regulations, and agree that you are responsible for
          compliance with any applicable local laws. If you do not agree with
          any of these terms, you are prohibited from using or accessing
          Celsius. The materials contained in Celsius are protected by
          applicable copyright and trademark law. 2. Use License Permission is
          granted to temporarily download one copy of Celsius per device for
          personal, non-commercial transitory viewing only. This is the grant of
          a license, not a transfer of title, and under this license you may
          not: modify or copy the materials; use the materials for any
          commercial purpose, or for any public display (commercial or
          non-commercial); attempt to decompile or reverse engineer any software
          contained in Celsius; remove any copyright or other proprietary
          notations from the materials; or transfer the materials to another
          person or "mirror" the materials on any other server. This license
          shall automatically terminate if you violate any of these restrictions
          and may be terminated by Celsius at any time. Upon terminating your
          viewing of these materials or upon the termination of this license,
          you must destroy any downloaded materials in your possession whether
          in electronic or printed format. 3. Disclaimer The materials within
          Celsius are provided on an 'as is' basis. Celsius makes no warranties,
          expressed or implied, and hereby disclaims and negates all other
          warranties including, without limitation, implied warranties or
          conditions of merchantability, fitness for a particular purpose, or
          non-infringement of intellectual property or other violation of
          rights. Further, Celsius does not warrant or make any representations
          concerning the accuracy, likely results, or reliability of the use of
          the materials on its website or otherwise relating to such materials
          or on any sites linked to Celsius. 4. Limitations In no event shall
          Celsius or its suppliers be liable for any damages (including, without
          limitation, damages for loss of data or profit, or due to business
          interruption) arising out of the use or inability to use Celsius, even
          if Celsius or a Celsius authorized representative has been notified
          orally or in writing of the possibility of such damage. Because some
          jurisdictions do not allow limitations on implied warranties, or
          limitations of liability for consequential or incidental damages,
          these limitations may not apply to you. 5. Accuracy of materials The
          materials appearing in Celsius could include technical, typographical,
          or photographic errors. Celsius does not warrant that any of the
          materials on Celsius are accurate, complete or current. Celsius may
          make changes to the materials contained in Celsius at any time without
          notice. However Celsius does not make any commitment to update the
          materials. 6. Links Celsius has not reviewed all of the sites linked
          to its app and is not responsible for the contents of any such linked
          site. The inclusion of any link does not imply endorsement by Celsius
          of the site. Use of any such linked website is at the user's own risk.
          7. Modifications Celsius may revise these terms of service for its app
          at any time without notice. By using Celsius you are agreeing to be
          bound by the then current version of these terms of service. 8.
          Governing Law These terms and conditions are governed by and construed
          in accordance with the laws of Kochi and you irrevocably submit to the
          exclusive jurisdiction of the courts in that State or location.
        </Text>
        <Title style={styles.titleText}>Privacy policy </Title>
        <Text>
          Privacy Policy Your privacy is important to us. It is Celsius's policy
          to respect your privacy regarding any information we may collect from
          you through our app, Celsius. We only ask for personal information
          when we truly need it to provide a service to you. We collect it by
          fair and lawful means, with your knowledge and consent. We also let
          you know why we’re collecting it and how it will be used. We only
          retain collected information for as long as necessary to provide you
          with your requested service. What data we store, we’ll protect within
          commercially acceptable means to prevent loss and theft, as well as
          unauthorized access, disclosure, copying, use or modification. We
          don’t share any personally identifying information publicly or with
          third-parties, except when required to by law. Our app may link to
          external sites that are not operated by us. Please be aware that we
          have no control over the content and practices of these sites, and
          cannot accept responsibility or liability for their respective privacy
          policies. You are free to refuse our request for your personal
          information, with the understanding that we may be unable to provide
          you with some of your desired services. Your continued use of our app
          will be regarded as acceptance of our practices around privacy and
          personal information. If you have any questions about how we handle
          user data and personal information, feel free to contact us. This
          policy is effective as of 27 June 2020.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
    marginRight: 10,
  },
  titleText: {
    fontSize: 20,
    marginBottom: 10,
  },
  loginButtonLabel: {
    fontSize: 22,
  },
  navButtonText: {
    fontSize: 16,
  },
});
