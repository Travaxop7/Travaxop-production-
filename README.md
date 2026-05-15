# Travaxop-production-
Website 
import javax.swing.*;
import javax.swing.border.EmptyBorder;
import java.awt.*;
import java.awt.event.*;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;

/**
 * TRAVAXOP CLOUD STUDIO - Desktop Edition
 * A professional Spotify-like interface built in Java.
 */
public class TravaxopStudio extends JFrame {

    private static final String ARTIST_NAME = "TRAVAXOP";
    private static final String BIO = "I am a music producer and composer dedicated to the Phonk genre. Underground bass, and relentless energy. On this channel, I bring you original productions, hard-hitting remixes, and curated phonk experiences designed for those who live life in the fast lane.";
    
    private JPanel mainContent;
    private CardLayout cardLayout;
    private List<Track> tracks;
    private JLabel currentTrackTitle;
    private JLabel currentTrackArtist;

    public TravaxopStudio() {
        // Initialize state
        tracks = new ArrayList<>();
        tracks.add(new Track("MONTAGEM OBSIDIAN", "2:45", "https://youtu.be/Rdy-ZPtEAeI"));
        tracks.add(new Track("AURA DO MAL", "3:12", "https://youtu.be/Gu0Gvu9iOIs"));

        setTitle("TRAVAXOP | Artist Cloud Studio");
        setSize(1100, 750);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        getContentPane().setBackground(new Color(18, 18, 18)); // Spotify Black

        // First, show the Login Gateway
        if (showLoginGateway()) {
            initUI();
        } else {
            System.exit(0);
        }
    }

    private boolean showLoginGateway() {
        JPanel loginPanel = new JPanel(new GridBagLayout());
        loginPanel.setBackground(Color.BLACK);
        loginPanel.setPreferredSize(new Dimension(400, 300));
        
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(10, 10, 10, 10);
        
        JLabel logo = new JLabel("X");
        logo.setFont(new Font("Serif", Font.ITALIC | Font.BOLD, 60));
        logo.setForeground(Color.RED);
        gbc.gridy = 0;
        loginPanel.add(logo, gbc);

        JLabel title = new JLabel("TRAVAXOP STUDIO");
        title.setFont(new Font("SansSerif", Font.BOLD, 24));
        title.setForeground(Color.WHITE);
        gbc.gridy = 1;
        loginPanel.add(title, gbc);

        JButton enterBtn = new JButton("ENTER STUDIO");
        enterBtn.setBackground(Color.WHITE);
        enterBtn.setForeground(Color.BLACK);
        enterBtn.setFocusPainted(false);
        enterBtn.setFont(new Font("SansSerif", Font.BOLD, 14));
        gbc.gridy = 2;
        loginPanel.add(enterBtn, gbc);

        int result = JOptionPane.showConfirmDialog(null, loginPanel, "Authorized Access Only", 
                     JOptionPane.OK_CANCEL_OPTION, JOptionPane.PLAIN_MESSAGE);
        
        return result == JOptionPane.OK_OPTION;
    }

    private void initUI() {
        setLayout(new BorderLayout());

        // Sidebar (West)
        add(createSidebar(), BorderLayout.WEST);

        // Main Content (Center)
        cardLayout = new CardLayout();
        mainContent = new JPanel(cardLayout);
        mainContent.setBackground(new Color(24, 24, 24));

        mainContent.add(createHomeView(), "HOME");
        mainContent.add(createAccountView(), "ACCOUNT");

        add(mainContent, BorderLayout.CENTER);

        // Player Bar (South)
        add(createPlayerBar(), BorderLayout.SOUTH);
    }

    private JPanel createSidebar() {
        JPanel sidebar = new JPanel();
        sidebar.setBackground(Color.BLACK);
        sidebar.setPreferredSize(new Dimension(220, 0));
        sidebar.setLayout(new BoxLayout(sidebar, BoxLayout.Y_AXIS));
        sidebar.setBorder(new EmptyBorder(20, 15, 20, 15));

        JLabel logo = new JLabel("TRAVAXOP");
        logo.setFont(new Font("SansSerif", Font.ITALIC | Font.BOLD, 22));
        logo.setForeground(Color.WHITE);
        logo.setAlignmentX(Component.LEFT_ALIGNMENT);
        sidebar.add(logo);
        sidebar.add(Box.createRigidArea(new Dimension(0, 30)));

        sidebar.add(createNavButton("Home", "HOME"));
        sidebar.add(Box.createRigidArea(new Dimension(0, 10)));
        sidebar.add(createNavButton("My Account", "ACCOUNT"));
        sidebar.add(Box.createRigidArea(new Dimension(0, 30)));

        JButton uploadBtn = new JButton("+ Upload Audio");
        uploadBtn.setBackground(new Color(239, 68, 68));
        uploadBtn.setForeground(Color.WHITE);
        uploadBtn.setFont(new Font("SansSerif", Font.BOLD, 12));
        uploadBtn.setMaximumSize(new Dimension(180, 40));
        uploadBtn.setFocusPainted(false);
        uploadBtn.addActionListener(e -> showUploadDialog());
        sidebar.add(uploadBtn);

        return sidebar;
    }

    private JPanel createHomeView() {
        JPanel panel = new JPanel(new BorderLayout());
        panel.setBackground(new Color(18, 18, 18));
        panel.setBorder(new EmptyBorder(30, 30, 30, 30));

        JLabel header = new JLabel("Popular Tracks");
        header.setFont(new Font("SansSerif", Font.BOLD, 28));
        header.setForeground(Color.WHITE);
        panel.add(header, BorderLayout.NORTH);

        JPanel listPanel = new JPanel();
        listPanel.setLayout(new BoxLayout(listPanel, BoxLayout.Y_AXIS));
        listPanel.setBackground(new Color(18, 18, 18));

        for (Track t : tracks) {
            listPanel.add(createTrackRow(t));
            listPanel.add(Box.createRigidArea(new Dimension(0, 5)));
        }

        panel.add(new JScrollPane(listPanel), BorderLayout.CENTER);
        return panel;
    }

    private JPanel createAccountView() {
        JPanel panel = new JPanel();
        panel.setLayout(new BoxLayout(panel, BoxLayout.Y_AXIS));
        panel.setBackground(new Color(24, 24, 24));
        panel.setBorder(new EmptyBorder(50, 50, 50, 50));

        JLabel name = new JLabel(ARTIST_NAME);
        name.setFont(new Font("SansSerif", Font.BOLD, 48));
        name.setForeground(Color.WHITE);
        panel.add(name);

        JTextArea bioText = new JTextArea(BIO);
        bioText.setWrapStyleWord(true);
        bioText.setLineWrap(true);
        bioText.setEditable(false);
        bioText.setBackground(null);
        bioText.setForeground(Color.LIGHT_GRAY);
        bioText.setFont(new Font("SansSerif", Font.PLAIN, 14));
        bioText.setMaximumSize(new Dimension(600, 200));
        panel.add(Box.createRigidArea(new Dimension(0, 20)));
        panel.add(bioText);

        panel.add(Box.createRigidArea(new Dimension(0, 40)));
        panel.add(createSocialLink("YouTube", "https://www.youtube.com/@Travaxop"));
        panel.add(Box.createRigidArea(new Dimension(0, 10)));
        panel.add(createSocialLink("Instagram", "https://www.instagram.com/travaxop"));
        panel.add(Box.createRigidArea(new Dimension(0, 10)));
        panel.add(createSocialLink("Spotify", "https://open.spotify.com/user/31bcsw34akho23uwy744lapawkle"));

        return panel;
    }

    private JPanel createPlayerBar() {
        JPanel player = new JPanel(new BorderLayout());
        player.setBackground(Color.BLACK);
        player.setPreferredSize(new Dimension(0, 90));
        player.setBorder(new EmptyBorder(10, 20, 10, 20));

        JPanel info = new JPanel(new GridLayout(2, 1));
        info.setBackground(Color.BLACK);
        currentTrackTitle = new JLabel("Select a Track");
        currentTrackTitle.setForeground(Color.WHITE);
        currentTrackTitle.setFont(new Font("SansSerif", Font.BOLD, 14));
        currentTrackArtist = new JLabel(ARTIST_NAME);
        currentTrackArtist.setForeground(Color.GRAY);
        currentTrackArtist.setFont(new Font("SansSerif", Font.PLAIN, 11));
        info.add(currentTrackTitle);
        info.add(currentTrackArtist);

        JPanel controls = new JPanel(new FlowLayout(FlowLayout.CENTER, 20, 10));
        controls.setBackground(Color.BLACK);
        JButton playBtn = new JButton("▶");
        playBtn.setFont(new Font("SansSerif", Font.BOLD, 20));
        playBtn.setBackground(Color.WHITE);
        playBtn.setFocusPainted(false);
        controls.add(playBtn);

        player.add(info, BorderLayout.WEST);
        player.add(controls, BorderLayout.CENTER);
        
        return player;
    }

    private JButton createNavButton(String text, String cardName) {
        JButton btn = new JButton(text);
        btn.setForeground(Color.GRAY);
        btn.setBackground(Color.BLACK);
        btn.setBorderPainted(false);
        btn.setFocusPainted(false);
        btn.setFont(new Font("SansSerif", Font.BOLD, 14));
        btn.addActionListener(e -> cardLayout.show(mainContent, cardName));
        return btn;
    }

    private JPanel createTrackRow(Track track) {
        JPanel row = new JPanel(new BorderLayout());
        row.setBackground(new Color(30, 30, 30));
        row.setBorder(new EmptyBorder(10, 15, 10, 15));
        row.setMaximumSize(new Dimension(Integer.MAX_VALUE, 50));

        JLabel title = new JLabel(track.title);
        title.setForeground(Color.WHITE);
        row.add(title, BorderLayout.CENTER);

        JButton play = new JButton("Play");
        play.addActionListener(e -> {
            currentTrackTitle.setText(track.title);
            openWebPage(track.url);
        });
        row.add(play, BorderLayout.EAST);

        return row;
    }

    private JButton createSocialLink(String name, String url) {
        JButton btn = new JButton(name);
        btn.addActionListener(e -> openWebPage(url));
        return btn;
    }

    private void showUploadDialog() {
        String title = JOptionPane.showInputDialog(this, "Enter Track Title:");
        if (title != null && !title.isEmpty()) {
            tracks.add(new Track(title, "3:00", "https://youtube.com"));
            mainContent.add(createHomeView(), "HOME"); // Refresh Home
            cardLayout.show(mainContent, "HOME");
        }
    }

    private void openWebPage(String url) {
        try {
            Desktop.getDesktop().browse(new URI(url));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> new TravaxopStudio().setVisible(true));
    }

    // Inner class for track data
    class Track {
        String title, duration, url;
        Track(String t, String d, String u) { title = t; duration = d; url = u; }
    }
}
