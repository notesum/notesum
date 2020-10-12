import React from 'react';
import { Box, Button, Container, Typography } from '@material-ui/core';


export default function Terms() {

    return (

        <div>
            <Box my={7}>
                <Container>
                    <Typography component="h1" variant="h4" align="center" color="textPrimary" style={{ fontWeight: 'bold' }} gutterBottom>
                        Nice that you want to join us!
                    </Typography>
                    <Typography component="h1" variant="h5" align="center" color="textPrimary" style={{ fontWeight: 'bold', marginBottom: '30px' }}>

                        Before you can access the beta, please read the following terms and conditions carefully:
                    </Typography>
                    <Typography variant="h6" color="textSecondary" paragraph>
                        Please note that this beta version is still undergoing testing and development before its official release. Thus,
                        we urgently advise you to safe your work as frequently as possible as NoteSum is provided “As it is”, WE CANNOT GUARANTEE
                        NO LOSS OF DATA (Summaries in the making, saved summaries or uploaded PDFs). Take your time to clearly think about it if a
                        total loss of your summary would cause any harm to your study progress. If yes, please do not use NoteSum for collecting highly
                        important information/ study material. This is JUST A WARNING for a very EXCEPTIONAL and UNLIKELY case.
                    </Typography>
                    <Typography variant="h6" color="textSecondary" paragraph>
                        The application will be licensed to you (for free) in the scope of the beta test. This software is protected under the Dutch
                        Copyright laws. Agreeing this form prevents you from copying, reverse engineering and redistributing this software. You shall
                        not sell the summaries that you created to any third person party as this may pose a copyright infringement to the original author
                        of the PDF you want to summarize. NoteSum is not liable for your infringement of authors copyright (e.g. by selling a
                        summary to another person/ organization), as we only offer a tool to summarize any PDF that you own.
                    </Typography>
                    <Typography variant="h6" color="textSecondary" paragraph>
                        This Beta Test will be open for approximately 2 months. You will be notified either by mail or via in app notification
                        about the exact duration to have enough time to save your data, as this test server is not permanent.
                    </Typography>
                    <Typography variant="h6" color="textSecondary" paragraph>
                        Using the beta application requires you to register an account with your email address if you want to upload and summarise
                        PDF files yourself. We value this trust alot and will keep your email adresses and uploads secured with acceptable security
                        measures. Please remember that no measure of data storage or data transaction is 100% secure and we cannot guarantee for security.
                    </Typography>
                    <Typography variant="h6" color="textSecondary" paragraph>
                        Please report any flaws, errors or imperfections found during your usage of the Beta Test. Beta Tester understands that
                        fast and exact accurate reporting is the motivation behind this Beta Test and undertakes best efforts to provide frequent
                        reports on all aspects of the product both positive and negative and acknowledges that any improvements, modifications and
                        changes arising from or in connection with the Beta Testers contribution to the Project, remain or become the exclusive property
                        of the Disclosing Party.
                    </Typography>
                    <Typography variant="h6" color="textSecondary" paragraph>
                        During this Beta Test NoteSum is not obliged to provide you any maintenance or other form of technical support, we will however,
                        give our best to fix issues you are experiencing, as it is important to us to find out about problems users have with our software.
                    </Typography>
                    <Typography variant="h6" color="textSecondary" paragraph>
                        Privacy policy: We will not collect any data that could identify you as a person including location or other details about you.
                        The data collected will only be about technical performance of the application as well as statistics about user behaviour.
                        We only use Google Analytics and anonymize your IP address (Even we cannot see it).
                    </Typography>
                    <Typography variant="h6" paragraph>
                        BY SIGNING UP, YOU ACKNOWLEDGE THAT: (1) YOU ARE 13 YEARS OF AGE OR OLDER, AND IF YOU ARE BETWEEN AGE 13 and 18,
                        YOU HAVE OBTAINED CONSENT FROM YOUR PARENT OR GUARDIAN; AND (2) YOU HAVE READ, UNDERSTOOD, AND ACCEPTED THE TERMS AND CONDITIONS OF
                        THIS AGREEMENT.”
                    </Typography>
                    <Typography variant="h6" paragraph>
                        You will be automatically redirected to test the app afther clicking "Accept".
                    </Typography>
                    <Button variant="contained" color="primary" href="/projects">Accept</Button>
                </Container>


            </Box>
        </div>
    );
}